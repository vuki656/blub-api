type ParamsType = {
    existing?: Record<string, string>
    value?: Record<string, string>
}

export interface Factory {
    createAmount(amount: number, params?: ParamsType): Promise<unknown[]>
    createOne(params?: ParamsType): Promise<unknown>
    generateData?(params?: ParamsType): Partial<unknown> | Promise<Partial<unknown>>
}
