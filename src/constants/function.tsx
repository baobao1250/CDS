export const BTN_ADD_CLICK = "btnAdd_Click";
export const BTN_UPDATE_CLICK = "btnUpdate_Click";
export const BTN_DELETE_CLICK = "btnDelete_Click";
export const BTN_SEARCH_CLICK = "btnSearch_Click";
export const BTN_MERGE_CLICK = "btnMerge_Click";
export const BTN_EXPORT_EXCEL_CLICK = "btnExportExcel_Click";
export const BTN_EXPORT_PDF_CLICK = "btnExportPDF_Click";
export const BTN_EXPORT_WORD_CLICK = "btnExportWord_Click";

export const LOAD_CHAT_BOT = () => {
    let __protocol = document.location.protocol;
    let __baseUrl = "https://static.fpt.ai/lc4t";

    let prefixNameLiveChat = "Tra Vinh";
    let CustomStyles = {
        // header
        headerBackground: "linear-gradient(86.7deg, #A2337BFF 0.85%, #CEB4CFBD 98.94%)!important",
        headerTextColor: "#ffffffff",
        headerLogoEnable: false,
        headerLogoLink: "https://congchuc.travinh.gov.vn//assets/images/login-logo.92e824.png",
        headerText: "Trợ lý ảo Trà Vinh",
        // main
        primaryColor: "#CB6DB4FF",
        secondaryColor: "#ecececff",
        primaryTextColor: "#ffffffff",
        secondaryTextColor: "#000000DE",
        buttonColor: "#b4b4b4ff",
        buttonTextColor: "#ffffffff",
        bodyBackgroundEnable: false,
        bodyBackgroundLink: "",
        avatarBot: "https://congchuc.travinh.gov.vn//assets/images/login-logo.92e824.png",
        sendMessagePlaceholder: "Nhập thông tin tại đây",
        // float button
        floatButtonLogo: "https://congchuc.travinh.gov.vn//assets/images/login-logo.92e824.png",
        floatButtonTooltip: "Chúng tôi có thể giúp gì cho bạn?",
        floatButtonTooltipEnable: true,
        // start screen
        customerLogo: "https://congchuc.travinh.gov.vn//assets/images/login-logo.92e824.png",
        customerWelcomeText: "Vui lòng nhập thông tin tại đây",
        customerButtonText: "Bắt đầu",
        prefixEnable: true,
        prefixType: "radio",
        prefixOptions: ["Anh", "Chị"],
        prefixPlaceholder: "Danh xưng",
        // custom css
        css: ".img-button-display > button { height: auto; float: left;  justify-content: flex-start; display: flex;text-align: start;}.v-card__actions { display: none;} .fpt_ai_livechat_button_tooltip.active {z-index: 99; !important}",
    };
    let objPreDefineLiveChat = {
        appCode: "314e9446625895e18d3ec8338d3da863",
        themes: "",
        styles: CustomStyles,
        appName: prefixNameLiveChat ? prefixNameLiveChat : "Live support",
        //thumb: "https://static.fpt.ai/lc4t/img/Icon-fpt-ai.png",
        icon_bot: "https://congchuc.travinh.gov.vn//assets/images/login-logo.92e824.png",
        tts_stt_mdw_endpoint: "https://console-mdw.fpt.ai/v1",
    };

    //appCodeHash = window.location.hash.substr(1);

    //if (appCodeHash.length == 32) {
    //  objPreDefineLiveChat.appCode = appCodeHash;
    //}

    let fpt_ai_livechat_script = document.createElement("script");
    fpt_ai_livechat_script.id = "fpt_ai_livechat_script";
    fpt_ai_livechat_script.src = __baseUrl + "/static/fptai-livechat.js?id=" + Math.random();
    document.body.appendChild(fpt_ai_livechat_script);

    let fpt_ai_livechat_stylesheet = document.createElement("link");
    fpt_ai_livechat_stylesheet.id = "fpt_ai_livechat_script";
    fpt_ai_livechat_stylesheet.rel = "stylesheet";
    fpt_ai_livechat_stylesheet.href = __baseUrl + "/static/fptai-livechat.css";
    document.body.appendChild(fpt_ai_livechat_stylesheet);

    fpt_ai_livechat_script.onload = function () {
        // @ts-ignore
        fpt_ai_render_chatbox(objPreDefineLiveChat, __baseUrl, "livechat.fpt.ai:443");
    };
};

export const LOAD_CHAT_BOT_MOBILE = () => {
    let __protocol = document.location.protocol;
    let __baseUrl = "https://static.fpt.ai/lc4t";

    let prefixNameLiveChat = "Tra Vinh";
    let CustomStyles = {
        // header
        headerBackground: "linear-gradient(86.7deg, #A2337BFF 0.85%, #CEB4CFBD 98.94%) !important",
        headerTextColor: "#ffffffff",
        headerLogoEnable: false,
        headerLogoLink: "https://congchuc.travinh.gov.vn//assets/images/login-logo.92e824.png",
        headerText: "Trợ lý ảo Smart Trà Vinh",
        // main
        primaryColor: "#CB6DB4FF",
        secondaryColor: "#ecececff",
        primaryTextColor: "#ffffffff",
        secondaryTextColor: "#000000DE",
        buttonColor: "#b4b4b4ff",
        buttonTextColor: "#ffffffff",
        bodyBackgroundEnable: false,
        bodyBackgroundLink: "",
        avatarBot: "https://congchuc.travinh.gov.vn//assets/images/login-logo.92e824.png",
        sendMessagePlaceholder: "Nhập thông tin tại đây",
        // float button
        floatButtonLogo: "https://congchuc.travinh.gov.vn//assets/images/login-logo.92e824.png",
        floatButtonTooltip: "Chúng tôi có thể giúp gì cho bạn?",
        floatButtonTooltipEnable: true,
        // start screen
        customerLogo: "https://congchuc.travinh.gov.vn//assets/images/login-logo.92e824.png",
        customerWelcomeText: "Vui lòng nhập thông tin tại đây",
        customerButtonText: "Bắt đầu",
        prefixEnable: true,
        prefixType: "radio",
        prefixOptions: ["Anh", "Chị"],
        prefixPlaceholder: "Danh xưng",
        // custom css
        css: ".img-button-display > button { height: auto; float: left;  justify-content: flex-start; display: flex;text-align: start;}",
    };
    let objPreDefineLiveChat = {
        appCode: "94b877331be4d1c2135c10845088cfe4",
        themes: "",
        styles: CustomStyles,
        appName: prefixNameLiveChat ? prefixNameLiveChat : "Live support",
        //thumb: "https://static.fpt.ai/lc4t/img/Icon-fpt-ai.png",
        icon_bot: "https://congchuc.travinh.gov.vn//assets/images/login-logo.92e824.png",
        tts_stt_mdw_endpoint: "https://console-mdw.fpt.ai/v1",
    };
    // // @ts-ignore
    // appCodeHash = window.location.hash.substr(1);
    // // @ts-ignore
    // if (appCodeHash.length == 32) {
    //     // @ts-ignore
    //     objPreDefineLiveChat.appCode = appCodeHash;
    // }

    let fpt_ai_livechat_script = document.createElement("script");
    fpt_ai_livechat_script.id = "fpt_ai_livechat_script";
    fpt_ai_livechat_script.src = __baseUrl + "/static/fptai-livechat.js?id=" + Math.random();
    document.body.appendChild(fpt_ai_livechat_script);

    let fpt_ai_livechat_stylesheet = document.createElement("link");
    fpt_ai_livechat_stylesheet.id = "fpt_ai_livechat_script";
    fpt_ai_livechat_stylesheet.rel = "stylesheet";
    fpt_ai_livechat_stylesheet.href = __baseUrl + "/static/fptai-livechat.css";
    document.body.appendChild(fpt_ai_livechat_stylesheet);

    fpt_ai_livechat_script.onload = function () {
        // @ts-ignore
        fpt_ai_render_chatbox(objPreDefineLiveChat, __baseUrl, "livechat.fpt.ai:443");
        if (localStorage.getItem("fptai_livechat_client_94b877331be4d1c2135c10845088cfe4")) {
            localStorage.setItem("fptai_livechat_client_94b877331be4d1c2135c10845088cfe4", "");
        }
        if (localStorage.getItem("socketCluster.authToken")) {
            localStorage.setItem("socketCluster.authToken", "");
        }
    };
};
