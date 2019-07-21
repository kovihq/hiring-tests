export const successResponse = (response: any): any => {
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
}

export const badRequest = (response: any): any => {
    return {
        statusCode: 400,
        body: JSON.stringify({
            message: response
        })
    };
}