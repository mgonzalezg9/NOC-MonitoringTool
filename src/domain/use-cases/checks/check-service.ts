interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (err: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {
    }

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)

            if (!req.ok) {
                throw new Error(`Service not available ${url}`)
            }

            this.successCallback();
        } catch (error) {
            this.errorCallback(error + '');
            return false
        }

        return true;
    }
}