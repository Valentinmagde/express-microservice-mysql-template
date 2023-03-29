/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-27-03
 * 
 * Class StatusCode
 * 
 * @para number _HTTP_CONTINUE
 * @para number _HTTP_SWITCHING_PROTOCOLS
 * @para number _HTTP_PROCESSING
 * @para number _HTTP_OK
 * @para number _HTTP_CREATED
 * @para number _HTTP_ACCEPTED
 * @para number _HTTP_NON_AUTHORITATIVE_INFORMATION
 * @para number _HTTP_NO_CONTENT
 * @para number _HTTP_RESET_CONTENT
 * @para number _HTTP_PARTIAL_CONTENT
 * @para number _HTTP_MULTI_STATUS
 * @para number _HTTP_ALREADY_REPORTED
 * @para number _HTTP_IM_USED
 * @para number _HTTP_MULTIPLE_CHOICES
 * @para number _HTTP_MOVED_PERMANENTLY
 * @para number _HTTP_FOUND
 * @para number _HTTP_SEE_OTHER
 * @para number _HTTP_NOT_MODIFIED
 * @para number _HTTP_RESERVED
 * @para number _HTTP_TEMPORARY_REDIRECT
 * @para number _HTTP_PERMANENTLY_REDIRECT
 * @para number _HTTP_BAD_REQUEST
 * @para number _HTTP_UNAUTHORIZED
 * @para number _HTTP_PAYMENT_REQUIRED
 * @para number _HTTP_FORBIDDEN
 * @para number _HTTP_NOT_FOUND
 * @para number _HTTP_METHOD_NOT_ALLOWED
 * @para number _HTTP_NOT_ACCEPTABLE
 * @para number _HTTP_PROXY_AUTHENTICATION_REQUIRED
 * @para number _HTTP_REQUEST_TIMEOUT
 * @para number _HTTP_CONFLICT
 * @para number _HTTP_GONE
 * @para number _HTTP_LENGTH_REQUIRED
 * @para number _HTTP_PRECONDITION_FAILED
 * @para number _HTTP_REQUEST_ENTITY_TOO_LARGE
 * @para number _HTTP_REQUEST_URI_TOO_LONG
 * @para number _HTTP_UNSUPPORTED_MEDIA_TYPE
 * @para number _HTTP_REQUESTED_RANGE_NOT_SATISFIABLE
 * @para number _HTTP_EXPECTATION_FAILED
 * @para number _HTTP_I_AM_A_TEAPOT
 * @para number _HTTP_MISDIRECTED_REQUEST
 * @para number _HTTP_UNPROCESSABLE_ENTITY
 * @para number _HTTP_LOCKED
 * @para number _HTTP_FAILED_DEPENDENCY
 * @para number _HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL
 * @para number _HTTP_UPGRADE_REQUIRED
 * @para number _HTTP_UPGRADE_REQUIRED
 * @para number _HTTP_PRECONDITION_REQUIRED
 * @para number _HTTP_TOO_MANY_REQUESTS
 * @para number _HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE
 * @para number _HTTP_UNAVAILABLE_FOR_LEGAL_REASONS
 * @para number _HTTP_INTERNAL_SERVER_ERROR
 * @para number _HTTP_NOT_IMPLEMENTED
 * @para number _HTTP_BAD_GATEWAY
 * @para number _HTTP_SERVICE_UNAVAILABLE
 * @para number _HTTP_GATEWAY_TIMEOUT
 * @para number _HTTP_VERSION_NOT_SUPPORTED
 * @para number _HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL
 * @para number _HTTP_INSUFFICIENT_STORAGE
 * @para number _HTTP_LOOP_DETECTED
 * @para number _HTTP_NOT_EXTENDED
 * @para number _HTTP_NETWORK_AUTHENTICATION_REQUIRED
 */
class StatusCode {
    private _HTTP_CONTINUE : number;
    private _HTTP_SWITCHING_PROTOCOLS: number;
    private _HTTP_PROCESSING: number;
    private _HTTP_OK: number;
    private _HTTP_CREATED: number;
    private _HTTP_ACCEPTED: number;
    private _HTTP_NON_AUTHORITATIVE_INFORMATION: number;
    private _HTTP_NO_CONTENT: number;
    private _HTTP_RESET_CONTENT: number;
    private _HTTP_PARTIAL_CONTENT: number;
    private _HTTP_MULTI_STATUS: number;
    private _HTTP_ALREADY_REPORTED: number;
    private _HTTP_IM_USED: number;
    private _HTTP_MULTIPLE_CHOICES: number;
    private _HTTP_MOVED_PERMANENTLY: number;
    private _HTTP_FOUND: number;
    private _HTTP_SEE_OTHER: number;
    private _HTTP_NOT_MODIFIED: number;
    private _HTTP_USE_PROXY: number;
    private _HTTP_RESERVED: number;
    private _HTTP_TEMPORARY_REDIRECT: number;
    private _HTTP_PERMANENTLY_REDIRECT: number;
    private _HTTP_BAD_REQUEST: number;
    private _HTTP_UNAUTHORIZED: number;
    private _HTTP_PAYMENT_REQUIRED: number;
    private _HTTP_FORBIDDEN: number;
    private _HTTP_NOT_FOUND: number;
    private _HTTP_METHOD_NOT_ALLOWED: number;
    private _HTTP_NOT_ACCEPTABLE: number;
    private _HTTP_PROXY_AUTHENTICATION_REQUIRED: number;
    private _HTTP_REQUEST_TIMEOUT: number;
    private _HTTP_CONFLICT: number;
    private _HTTP_GONE: number;
    private _HTTP_LENGTH_REQUIRED: number;
    private _HTTP_PRECONDITION_FAILED: number;
    private _HTTP_REQUEST_ENTITY_TOO_LARGE: number;
    private _HTTP_REQUEST_URI_TOO_LONG: number;
    private _HTTP_UNSUPPORTED_MEDIA_TYPE: number;
    private _HTTP_REQUESTED_RANGE_NOT_SATISFIABLE: number;
    private _HTTP_EXPECTATION_FAILED: number;
    private _HTTP_I_AM_A_TEAPOT: number;
    private _HTTP_MISDIRECTED_REQUEST: number;
    private _HTTP_UNPROCESSABLE_ENTITY: number;
    private _HTTP_LOCKED: number;
    private _HTTP_FAILED_DEPENDENCY: number;
    private _HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL: number;
    private _HTTP_UPGRADE_REQUIRED: number;
    private _HTTP_PRECONDITION_REQUIRED: number;
    private _HTTP_TOO_MANY_REQUESTS: number;
    private _HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE: number;
    private _HTTP_UNAVAILABLE_FOR_LEGAL_REASONS: number;
    private _HTTP_INTERNAL_SERVER_ERROR: number;
    private _HTTP_NOT_IMPLEMENTED: number;
    private _HTTP_BAD_GATEWAY: number;
    private _HTTP_SERVICE_UNAVAILABLE: number;
    private _HTTP_GATEWAY_TIMEOUT: number;
    private _HTTP_VERSION_NOT_SUPPORTED: number;
    private _HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL: number;
    private _HTTP_INSUFFICIENT_STORAGE: number;
    private _HTTP_LOOP_DETECTED: number;
    private _HTTP_NOT_EXTENDED: number;
    private _HTTP_NETWORK_AUTHENTICATION_REQUIRED: number;

    /**
     * Create a new ErrorNumbers instance.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @return void
     */
    constructor() {
        this._HTTP_CONTINUE = 100;
        this._HTTP_SWITCHING_PROTOCOLS = 101;
        this._HTTP_PROCESSING = 102;
        this._HTTP_OK = 200;
        this._HTTP_CREATED = 201;
        this._HTTP_ACCEPTED = 202;
        this._HTTP_NON_AUTHORITATIVE_INFORMATION = 203;
        this._HTTP_NO_CONTENT = 204;
        this._HTTP_RESET_CONTENT = 205;
        this._HTTP_PARTIAL_CONTENT = 206;
        this._HTTP_MULTI_STATUS = 207;
        this._HTTP_ALREADY_REPORTED = 208;
        this._HTTP_IM_USED = 226;
        this._HTTP_MULTIPLE_CHOICES = 300;
        this._HTTP_MOVED_PERMANENTLY = 301;
        this._HTTP_FOUND = 302;
        this._HTTP_SEE_OTHER = 303;
        this._HTTP_NOT_MODIFIED = 304;
        this._HTTP_USE_PROXY = 305;
        this._HTTP_RESERVED = 306;
        this._HTTP_TEMPORARY_REDIRECT = 307;
        this._HTTP_PERMANENTLY_REDIRECT = 308;
        this._HTTP_BAD_REQUEST = 400;
        this._HTTP_UNAUTHORIZED = 401;
        this._HTTP_PAYMENT_REQUIRED = 402;
        this._HTTP_FORBIDDEN = 403;
        this._HTTP_NOT_FOUND = 404;
        this._HTTP_METHOD_NOT_ALLOWED = 405;
        this._HTTP_NOT_ACCEPTABLE = 406;
        this._HTTP_PROXY_AUTHENTICATION_REQUIRED = 407;
        this._HTTP_REQUEST_TIMEOUT = 408;
        this._HTTP_CONFLICT = 409;
        this._HTTP_GONE = 410;
        this._HTTP_LENGTH_REQUIRED = 411;
        this._HTTP_PRECONDITION_FAILED = 412;
        this._HTTP_REQUEST_ENTITY_TOO_LARGE = 413;
        this._HTTP_REQUEST_URI_TOO_LONG = 414;
        this._HTTP_UNSUPPORTED_MEDIA_TYPE = 415;
        this._HTTP_REQUESTED_RANGE_NOT_SATISFIABLE = 416;
        this._HTTP_EXPECTATION_FAILED = 417;
        this._HTTP_I_AM_A_TEAPOT = 418;
        this._HTTP_MISDIRECTED_REQUEST = 421;
        this._HTTP_UNPROCESSABLE_ENTITY = 422;
        this._HTTP_LOCKED = 423;
        this._HTTP_FAILED_DEPENDENCY = 424;
        this._HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL = 425;
        this._HTTP_UPGRADE_REQUIRED = 426;
        this._HTTP_PRECONDITION_REQUIRED = 428;
        this._HTTP_TOO_MANY_REQUESTS = 429;
        this._HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
        this._HTTP_UNAVAILABLE_FOR_LEGAL_REASONS = 451;
        this._HTTP_INTERNAL_SERVER_ERROR = 500;
        this._HTTP_NOT_IMPLEMENTED = 501;
        this._HTTP_BAD_GATEWAY = 502;
        this._HTTP_SERVICE_UNAVAILABLE = 503;
        this._HTTP_GATEWAY_TIMEOUT = 504;
        this._HTTP_VERSION_NOT_SUPPORTED = 505;
        this._HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL = 506;
        this._HTTP_INSUFFICIENT_STORAGE = 507;
        this._HTTP_LOOP_DETECTED = 508;
        this._HTTP_NOT_EXTENDED = 510;
        this._HTTP_NETWORK_AUTHENTICATION_REQUIRED = 511;
    }

    public get HTTP_CONTINUE() {
        return this._HTTP_CONTINUE;
    }

    public get HTTP_SWITCHING_PROTOCOLS() {
        return this._HTTP_SWITCHING_PROTOCOLS;
    }

    public get HTTP_PROCESSING() {
        return this._HTTP_PROCESSING;
    }

    public get HTTP_OK() {
        return this._HTTP_OK;
    }

    public get HTTP_CREATED() {
        return this._HTTP_CREATED;
    }

    public get HTTP_NON_AUTHORITATIVE_INFORMATION() {
        return this._HTTP_NON_AUTHORITATIVE_INFORMATION;
    }

    public get HTTP_NO_CONTENT() {
        return this._HTTP_NO_CONTENT;
    }

    public get HTTP_RESET_CONTENT() {
        return this._HTTP_RESET_CONTENT;
    }

    public get HTTP_PARTIAL_CONTENT() {
       return this._HTTP_PARTIAL_CONTENT;
    }
    
    public get HTTP_MULTI_STATUS() {
        return this._HTTP_MULTI_STATUS;
    }

    public get HTTP_ALREADY_REPORTED() {
        return this._HTTP_ALREADY_REPORTED;
    }
        
    public get HTTP_IM_USED() {
        return this._HTTP_IM_USED;
    }

    public get HTTP_MULTIPLE_CHOICES() {
        return this._HTTP_MULTIPLE_CHOICES;
    }

    public get HTTP_MOVED_PERMANENTLY() {
        return this._HTTP_MOVED_PERMANENTLY;
    }
        
    public get HTTP_FOUND() {
        return this._HTTP_FOUND;
    }
        
    public get HTTP_SEE_OTHER() {
        return this._HTTP_SEE_OTHER;
    }
        
    public get HTTP_NOT_MODIFIED() {
        return this._HTTP_NOT_MODIFIED;
    }
        
    public get HTTP_USE_PROXY() {
        return this._HTTP_USE_PROXY;
    }
        
    public get HTTP_RESERVED() {
        return this._HTTP_RESERVED;
    }
        
    public get HTTP_TEMPORARY_REDIRECT() {
        return this._HTTP_TEMPORARY_REDIRECT;
    }
        
    public get HTTP_PERMANENTLY_REDIRECT() {
        return this._HTTP_PERMANENTLY_REDIRECT;
    }
        
    public get HTTP_BAD_REQUEST() {
        return this._HTTP_BAD_REQUEST;
    }
        
    public get HTTP_UNAUTHORIZED() {
        return this._HTTP_UNAUTHORIZED;
    }
        
    public get HTTP_PAYMENT_REQUIRED() {
        return this._HTTP_PAYMENT_REQUIRED;
    }
        
    public get HTTP_FORBIDDEN() {
        return this._HTTP_FORBIDDEN;
    }
        
    public get HTTP_NOT_FOUND() {
        return this._HTTP_NOT_FOUND;
    }
        
    public get HTTP_METHOD_NOT_ALLOWED() {
        return this._HTTP_METHOD_NOT_ALLOWED;
    }
        
    public get HTTP_NOT_ACCEPTABLE() {
        return this._HTTP_NOT_ACCEPTABLE;
    }
        
    public get HTTP_PROXY_AUTHENTICATION_REQUIRED() {
        return this._HTTP_PROXY_AUTHENTICATION_REQUIRED;
    }
        
    public get HTTP_REQUEST_TIMEOUT() {
        return this._HTTP_REQUEST_TIMEOUT;
    }
        
    public get HTTP_CONFLICT() {
        return this._HTTP_CONFLICT;
    }
        
    public get HTTP_GONE() {
        return this._HTTP_GONE;
    }
        
    public get HTTP_LENGTH_REQUIRED() {
        return this._HTTP_LENGTH_REQUIRED;
    }
        
    public get HTTP_PRECONDITION_FAILED() {
        return this._HTTP_PRECONDITION_FAILED;
    }
        
    public get HTTP_REQUEST_ENTITY_TOO_LARGE() {
        return this._HTTP_REQUEST_ENTITY_TOO_LARGE;
    }
        
    public get HTTP_REQUEST_URI_TOO_LONG() {
        return this._HTTP_REQUEST_URI_TOO_LONG;
    }
        
    public get HTTP_UNSUPPORTED_MEDIA_TYPE() {
        return this._HTTP_UNSUPPORTED_MEDIA_TYPE;
    }
        
    public get HTTP_REQUESTED_RANGE_NOT_SATISFIABLE() {
        return this._HTTP_REQUESTED_RANGE_NOT_SATISFIABLE;
    }
        
    public get HTTP_EXPECTATION_FAILED() {
        return this._HTTP_EXPECTATION_FAILED;
    }
        
    public get HTTP_I_AM_A_TEAPOT() {
        return this._HTTP_I_AM_A_TEAPOT;
    }
       
    public get HTTP_MISDIRECTED_REQUEST() {
        return this._HTTP_MISDIRECTED_REQUEST;
    }
        
    public get HTTP_UNPROCESSABLE_ENTITY() {
        return this._HTTP_UNPROCESSABLE_ENTITY;
    }
        
    public get HTTP_LOCKED() {
        return this._HTTP_LOCKED;
    }
        
    public get HTTP_FAILED_DEPENDENCY() {
        return this._HTTP_FAILED_DEPENDENCY;
    }
        
    public get HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL() {
        return this._HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL;
    }
        
    public get HTTP_UPGRADE_REQUIRED() {
        return this._HTTP_UPGRADE_REQUIRED;
    }
        
    public get HTTP_PRECONDITION_REQUIRED() {
        return this._HTTP_PRECONDITION_REQUIRED;
    }
        
    public get HTTP_TOO_MANY_REQUESTS() {
        return this._HTTP_TOO_MANY_REQUESTS;
    }
        
    public get HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE() {
        return this._HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE;
    }
        
    public get HTTP_UNAVAILABLE_FOR_LEGAL_REASONS() {
        return this._HTTP_UNAVAILABLE_FOR_LEGAL_REASONS;
    }
        
    public get HTTP_INTERNAL_SERVER_ERROR() {
        return this._HTTP_INTERNAL_SERVER_ERROR;
    }
        
    public get HTTP_NOT_IMPLEMENTED() {
        return this._HTTP_NOT_IMPLEMENTED;
    }
        
    public get HTTP_BAD_GATEWAY() {
        return this._HTTP_BAD_GATEWAY;
    }
        
    public get HTTP_SERVICE_UNAVAILABLE() {
        return this._HTTP_SERVICE_UNAVAILABLE;
    }
        
    public get HTTP_GATEWAY_TIMEOUT() {
        return this._HTTP_GATEWAY_TIMEOUT;
    }
        
    public get HTTP_VERSION_NOT_SUPPORTED() {
        return this._HTTP_VERSION_NOT_SUPPORTED;
    }
        
    public get HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL() {
        return this._HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL;
    }
        
    public get HTTP_INSUFFICIENT_STORAGE() {
        return this._HTTP_INSUFFICIENT_STORAGE;
    }

    public get HTTP_LOOP_DETECTED() {
        return this._HTTP_LOOP_DETECTED;
    }

    public get HTTP_NOT_EXTENDED() {
        return this._HTTP_NOT_EXTENDED;
    }

    public get HTTP_NETWORK_AUTHENTICATION_REQUIRED() {
        return this._HTTP_NETWORK_AUTHENTICATION_REQUIRED;
    }
}

const statusCode = new StatusCode();
export default statusCode;