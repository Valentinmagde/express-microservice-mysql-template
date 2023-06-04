/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-27-03
 *
 * Class ErrorNumbers
 *
 * @para number _validator
 * @para number _bad_login_credentials
 * @para number _invalid_token
 * @para number _expired_token
 * @para number _blacklisted_token
 * @para number _token_not_found
 * @para number _resource_not_found
 * @para number _not_allowed_method
 * @para number _cr_unknown_error
 * @para number _cr_connection_error
 * @para number _cr_conn_host_error
 * @para number _cr_unknown_host
 * @para number _cr_server_gone_error
 * @para number _cr_out_of_memory
 * @para number _cr_server_lost
 * @para number _integrity_constraint_violation
 * @para number _generic_error
 */
class ErrorNumbers {
    private _validator : number;
    private _badLoginCredentials : number;
    private _invalidToken : number;
    private _expiredToken : number;
    private _blacklistedToken : number;
    private _tokenNotFound : number;
    private _resourceNotFound : number;
    private _notAllowedMethod : number;
    private _crUnknownError : number;
    private _crConnectionError : number;
    private _crConnHostError : number;
    private _crUnknownHost : number;
    private _crServerGoneError : number;
    private _crOutOfMemory : number;
    private _crServerLost : number;
    private _integrityConstraintViolation : number;
    private _genericError : number;

    /**
     * Create a new ErrorNumbers instance.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     */
    constructor() {
        this._validator = 6;
        this._badLoginCredentials = 7;
        this._invalidToken = 11;
        this._expiredToken = 12;
        this._blacklistedToken = 13;
        this._tokenNotFound = 14;
        this._resourceNotFound = 26;
        this._notAllowedMethod = 31;
        this._crUnknownError = 251;
        this._crConnectionError = 252;
        this._crConnHostError = 253;
        this._crUnknownHost = 254;
        this._crServerGoneError = 255;
        this._crOutOfMemory = 256;
        this._crServerLost = 257;
        this._integrityConstraintViolation = 258;
        this._genericError = 259;
    }

    /**
     * Get validator error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the error number of validator
     */
    public get validator(): number {
        return this._validator;
    }

    /**
     * Get bad login credentials error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the bad login credentials error number
     */
    public get badLoginCredentials(): number {
        return this._badLoginCredentials;
    }

    /**
     * Get invalid token error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the invalid token error number
     */
    public get invalidToken(): number {
        return this._invalidToken;
    }

    /**
     * Get expired token error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the expired token error number
     */
    public get expiredToken(): number {
        return this._expiredToken;
    }

    /**
     * Get blacklisted token error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the blacklisted token error number
     */
    public get blacklistedToken(): number {
        return this._blacklistedToken;
    }

    /**
     * Get token not found error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the token not found error number
     */
    public get tokenNotFound(): number {
        return this._tokenNotFound;
    }

    /**
     * Get resource not found error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the resource not found error number
     */
    public get resourceNotFound(): number {
        return this._resourceNotFound;
    }

    /**
     * Get not allowed method error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the not allowed method error number
     */
    public get notAllowedMethod(): number {
        return this._notAllowedMethod;
    }

    /**
     * Get cr unknown error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr unknown error error number
     */
    public get crUnknownError(): number {
        return this._crUnknownError;
    }

    /**
     * Get cr connection error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr connection error error number
     */
    public get crConnectionError(): number {
        return this._crConnectionError;
    }

    /**
     * Get cr conn host error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr conn host error error number
     */
    public get crConnHostError(): number {
        return this._crConnHostError;
    }

    /**
     * Get cr unknown host error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr unknown host error number
     */
    public get crUnknownHost(): number {
        return this._crUnknownHost;
    }

    /**
     * Get cr server gone error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr server gone error number.
     */
    public get crServerGoneError(): number {
        return this._crServerGoneError;
    }

    /**
     * Get cr out of memory error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr out of memory error number
     */
    public get crOutOfMemory(): number {
        return this._crOutOfMemory;
    }

    /**
     * Get cr server lost error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr server lost error number
     */
    public get crServerLost(): number {
        return this._crServerLost;
    }

    /**
     * Get integrity constraint violation error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the integrity constraint violation error number
     */
    public get integrityConstraintViolation(): number {
        return this._integrityConstraintViolation;
    }

    /**
     * Get generic error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the generic error error number.
     */
    public get genericError(): number {
        return this._genericError;
    }
}

const errorNumbers = new ErrorNumbers();
export default errorNumbers;