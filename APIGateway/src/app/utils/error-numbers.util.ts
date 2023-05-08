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
    private _bad_login_credentials : number;
    private _invalid_token : number;
    private _expired_token : number;
    private _blacklisted_token : number;
    private _token_not_found : number;
    private _resource_not_found : number;
    private _not_allowed_method : number;
    private _cr_unknown_error : number;
    private _cr_connection_error : number;
    private _cr_conn_host_error : number;
    private _cr_unknown_host : number;
    private _cr_server_gone_error : number;
    private _cr_out_of_memory : number;
    private _cr_server_lost : number;
    private _integrity_constraint_violation : number;
    private _generic_error : number;

    /**
     * Create a new ErrorNumbers instance.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return void
     */
    constructor() {
        this._validator = 6;
        this._bad_login_credentials = 7;
        this._invalid_token = 11;
        this._expired_token = 12;
        this._blacklisted_token = 13;
        this._token_not_found = 14;
        this._resource_not_found = 26;
        this._not_allowed_method = 31;
        this._cr_unknown_error = 251;
        this._cr_connection_error = 252;
        this._cr_conn_host_error = 253;
        this._cr_unknown_host = 254;
        this._cr_server_gone_error = 255;
        this._cr_out_of_memory = 256;
        this._cr_server_lost = 257;
        this._integrity_constraint_violation = 258;
        this._generic_error = 259;
    }

    /**
     * Get validator error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number validator
     */
    public get validator() {
        return this._validator;
    }

    /**
     * Get bad login credentials error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _bad_login_credentials
     */
    public get bad_login_credentials() {
        return this._bad_login_credentials;
    }

    /**
     * Get invalid token error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _invalid_token
     */
    public get invalid_token() {
        return this._invalid_token;
    }

    /**
     * Get expired token error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _expired_token
     */
    public get expired_token() {
        return this._expired_token;
    }

    /**
     * Get blacklisted token error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _blacklisted_token
     */
    public get blacklisted_token() {
        return this._blacklisted_token;
    }

    /**
     * Get token not found error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _token_not_found
     */
    public get token_not_found() {
        return this._token_not_found;
    }

    /**
     * Get resource not found error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _resource_not_found
     */
    public get resource_not_found() {
        return this._resource_not_found;
    }

    /**
     * Get not allowed method error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _not_allowed_method
     */
    public get not_allowed_method() {
        return this._not_allowed_method;
    }

    /**
     * Get cr unknown error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _cr_unknown_error
     */
    public get cr_unknown_error() {
        return this._cr_unknown_error;
    }

    /**
     * Get cr connection error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _cr_connection_error
     */
    public get cr_connection_error() {
        return this._cr_connection_error;
    }

    /**
     * Get cr conn host error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _cr_conn_host_error
     */
    public get cr_conn_host_error() {
        return this._cr_conn_host_error;
    }

    /**
     * Get cr unknown host error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _cr_unknown_host
     */
    public get cr_unknown_host() {
        return this._cr_unknown_host;
    }

    /**
     * Get cr server gone error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _cr_server_gone_error
     */
    public get cr_server_gone_error() {
        return this._cr_server_gone_error;
    }

    /**
     * Get cr out of memory error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _cr_out_of_memory
     */
    public get cr_out_of_memory() {
        return this._cr_out_of_memory;
    }

    /**
     * Get cr server lost error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _cr_server_lost
     */
    public get cr_server_lost() {
        return this._cr_server_lost;
    }

    /**
     * Get integrity constraint violation error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _integrity_constraint_violation
     */
    public get integrity_constraint_violation() {
        return this._integrity_constraint_violation;
    }

    /**
     * Get generic error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return number _generic_error
     */
    public get generic_error() {
        return this._generic_error;
    }
}

const errorNumbers = new ErrorNumbers();
export default errorNumbers;