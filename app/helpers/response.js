const rsSuccess = (Result = null) => {
    return { ErrorCode: 0, Message: "Success", Result };
};

const rsErrorUnauthorized = () => {
    return { ErrorCode: 401, Message: "Unauthorized", Result: null };
};

const rsErrorOperation = (error) => {
    return {
        ErrorCode: 402,
        Message: "Error during operation ",
        Result: error,
    };
};

const rsErrorNotFound = (ms = "") => {
    return { ErrorCode: 404, Message: "Find not found " + ms, Result: null };
};

const rsErrorInternalServer = (ms = "") => {
    return {
        ErrorCode: 500,
        Message: "Internal Server Error " + ms,
        Result: null,
    };
};

const rsErrorNotExist = (item) => {
    return { ErrorCode: 406, Message: `${item} is not exist`, Result: null };
};

const rsErrorExist = (any) => {
    return { ErrorCode: 403, Message: `${any} already exists`, Result: null };
};

const rsError = (ErrorCode, Message) => {
    return { ErrorCode, Message, Result: null };
};


module.exports = {
    rsSuccess,
    rsErrorUnauthorized,
    rsErrorOperation,
    rsErrorNotFound,
    rsErrorInternalServer,
    rsErrorNotExist,
    rsErrorExist,
    rsError
}