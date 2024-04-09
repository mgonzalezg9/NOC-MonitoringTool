interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)

            if (!req.ok) {
                throw new Error(`Service not available ${url}`)
            }

            console.log(`${url} is OK`);
        } catch (error) {
            console.log(`${error}`);
            return false
        }

        return true;
    }
}