/*
 * Used in prisma (ORM) when there is a need to connect a relation
 * that can also be null. For example, when creating a user, you can assign
 * that user a vehicle but don't have to. If you decide to not assign him a vehicle,
 * you will send `null` or `undefined`. If that is sent, orm shouldn't do anything.
 * If an ID is sent, it should connect those entities.
 */
export const nullableConnect = (id?: string | null) => {
    if (!id) {
        return
    }

    return {
        connect: {
            id,
        },
    } as any
}
