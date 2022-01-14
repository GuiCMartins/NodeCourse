const { UserModel } = require('../../models');
const { useErrorHandler } = require('../../errors')

const useAuthController = () => {
    const errorHandler = useErrorHandler();

    const signUp = errorHandler.asyncCatch(async (req, res, next) => {
        const newUser = await UserModel.create(req.body);

        res.status(201).json({
            status: 'SUCCESS',
            data: {
                user: newUser
            }
        })
    })

    return {
        signUp
    }
}

module.exports = useAuthController