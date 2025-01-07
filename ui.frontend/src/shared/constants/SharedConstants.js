/**
 * Common Constants
 */
const SharedConstants = {
    KEY_CHAR_CODE :{
        SPACE: 32,
        ENTER: 13
    },
    /**
     * Setting For SHared Component Level Constants
     */
    SHARED_COMPONENTS:{
        PLAY_PAUSE_BUTTON:{
            CONFIG_SETTING :{
                tension: 300, 
                friction: 27, 
                precision: 0.1
            }
        }
    },

    /**
     * ANALYTICS QUERY PARAMS OBJECT
     */
    ANALYTICS_QUERY_PARAM: {
        INTCID: 'intcid'
    },
    /**
     * Keys which are not allowed in rel attribute
     */
    NO_FOLLOW:{
        NOTALLOWED: ['follow', '', 'undefined']
    },

    SSO_CONSTANTS:{
        CODE_VERIFIER: "code_verifier",
        STATE_UUID: "state",
        REDIRECT_URI: 'ssg_redirect_uri',
        SOURCE_URL: 'source-url',
        TOKEN_GRANT_TYPE : 'authorization_code',
        HEADER_CONTENT_TYPE : 'application/x-www-form-urlencoded',
        CMS_APPNAME: 'cms',
        CCC_APPNAME: 'ccc'
    },
    MMB: "MMB",
    BOOKCOACH: "BOOKCOACH",
    CABIN_CLASS:{
        first:["F",'A'],
        business:['J','D','C','W','Z'],
        economy:['B','Y','Q','M','K','H','L','U','V','E','T']
    }
};

// Default Export
export default SharedConstants;