(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 9580:
/***/ ((module) => {

// Exports
module.exports = {
	"main_footer": "Footer_main_footer__SQv_e",
	"footer": "Footer_footer__Tl1eP"
};


/***/ }),

/***/ 998:
/***/ ((module) => {

// Exports
module.exports = {
	"navbar": "Header_navbar__Qt0Y4",
	"mainLink": "Header_mainLink__itZEO",
	"link": "Header_link__3RNlo",
	"login_link": "Header_login_link__2J8dp",
	"navbar_toggler": "Header_navbar_toggler__3dp6a",
	"navbar_toggler_icon": "Header_navbar_toggler_icon__tseee"
};


/***/ }),

/***/ 7168:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "Home_container__bCOhY",
	"main": "Home_main__nLjiQ",
	"footer": "Home_footer____T7K",
	"title": "Home_title__T09hD",
	"description": "Home_description__41Owk",
	"code": "Home_code__suPER",
	"grid": "Home_grid__GxQ85",
	"card": "Home_card___LpL1",
	"card_last": "Home_card_last__FfHkf",
	"logo": "Home_logo__27_tb"
};


/***/ }),

/***/ 5002:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: ./styles/Header.module.css
var Header_module = __webpack_require__(998);
var Header_module_default = /*#__PURE__*/__webpack_require__.n(Header_module);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-nextjs-toast"
var external_react_nextjs_toast_ = __webpack_require__(4665);
;// CONCATENATED MODULE: ./Components/Header.js





const Header = ()=>{
    const { 0: isLogged , 1: setLogged  } = (0,external_react_.useState)(false);
    const { 0: role , 1: setRole  } = (0,external_react_.useState)(null);
    (0,external_react_.useEffect)(()=>{
        let getItem = localStorage.getItem("isLogged");
        if (getItem === '1') {
            setRole(localStorage.getItem("role"));
            setLogged(true);
        } else {
            setLogged(false);
        }
    });
    return(/*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar, {
        className: (Header_module_default()).navbar,
        bg: "light",
        expand: "lg",
        sticky: "top",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Container, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Brand, {
                    href: "/",
                    className: (Header_module_default()).mainLink,
                    children: "Scheduler"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Navbar.Toggle, {
                    "aria-controls": "basic-navbar-nav",
                    className: `${(Header_module_default()).navbar_toggler} ${(Header_module_default()).navbar_toggler_icon}`
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Navbar.Collapse, {
                    id: "basic-navbar-nav",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Nav, {
                            className: "me-auto",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Nav.Link, {
                                    href: "/",
                                    className: (Header_module_default()).link,
                                    children: "Home"
                                }),
                                !isLogged ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Nav.Link, {
                                    href: `/dashboard/${localStorage.getItem("role")}`,
                                    className: (Header_module_default()).link,
                                    children: "Dashboard"
                                })
                            ]
                        }),
                        !isLogged ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Nav, {
                            className: "ms-auto",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Nav.Link, {
                                    className: (Header_module_default()).link,
                                    href: "/register",
                                    children: "Register"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Nav.Link, {
                                    className: (Header_module_default()).login_link,
                                    href: "/login",
                                    children: "Login"
                                })
                            ]
                        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Nav, {
                            className: "ms-auto",
                            children: [
                                role === 'faculty' ? /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Nav.Link, {
                                    className: (Header_module_default()).link,
                                    href: "/create",
                                    children: "Create"
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                }),
                                role === 'faculty' ? /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Nav.Link, {
                                    className: (Header_module_default()).link,
                                    href: "/timetable",
                                    children: "Timetable"
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Nav.Link, {
                                    className: (Header_module_default()).login_link,
                                    onClick: ()=>{
                                        localStorage.removeItem("isLogged");
                                        localStorage.removeItem("accessToken");
                                        localStorage.removeItem("email");
                                        localStorage.removeItem("remote");
                                        localStorage.removeItem("in_person");
                                        localStorage.removeItem("role");
                                        localStorage.removeItem("from");
                                        localStorage.removeItem("to");
                                        window.location.href = "/";
                                    },
                                    children: "Logout"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    }));
};
/* harmony default export */ const Components_Header = (Header);

// EXTERNAL MODULE: ./styles/Footer.module.css
var Footer_module = __webpack_require__(9580);
var Footer_module_default = /*#__PURE__*/__webpack_require__.n(Footer_module);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
;// CONCATENATED MODULE: ./Components/Footer.js



const Footer = ()=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (Footer_module_default()).main_footer,
        children: /*#__PURE__*/ jsx_runtime_.jsx("footer", {
            className: (Footer_module_default()).footer,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                children: [
                    "Created with ❣️ by Aemie Jariwala for ",
                    "Microsoft Engage'21"
                ]
            })
        })
    }));
};
/* harmony default export */ const Components_Footer = (Footer);

;// CONCATENATED MODULE: ./public/arrow-up.svg
/* harmony default export */ const arrow_up = ({"src":"/_next/static/media/arrow-up.c2d9db29.svg","height":24,"width":24});
;// CONCATENATED MODULE: ./Components/ScrollTop.js

// import styles from '../styles/ScrollTop.module.css'




const ScrollTop = ()=>{
    (0,external_react_.useEffect)(()=>{
        if (false) {}
    }, []);
    return(/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
            id: "scroll",
            onClick: (e)=>{
                e.preventDefault();
                window.scrollTo(0, 0);
            },
            children: /*#__PURE__*/ jsx_runtime_.jsx(next_image["default"], {
                src: arrow_up
            })
        })
    }));
};
/* harmony default export */ const Components_ScrollTop = (ScrollTop);

// EXTERNAL MODULE: ./styles/Home.module.css
var Home_module = __webpack_require__(7168);
var Home_module_default = /*#__PURE__*/__webpack_require__.n(Home_module);
;// CONCATENATED MODULE: ./Components/Layout.js






const Layout = ({ children  })=>{
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Components_Header, {
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Components_ScrollTop, {
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Container, {
                className: (Home_module_default()).container,
                children: [
                    children,
                    /*#__PURE__*/ jsx_runtime_.jsx(Components_Footer, {
                    })
                ]
            })
        ]
    }));
};
/* harmony default export */ const Components_Layout = (Layout);

;// CONCATENATED MODULE: ./pages/_app.js




function MyApp({ Component , pageProps  }) {
    return(/*#__PURE__*/ jsx_runtime_.jsx(Components_Layout, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
            ...pageProps
        })
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 8028:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 3018:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/to-base-64.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 358:
/***/ ((module) => {

"use strict";
module.exports = require("react-bootstrap");

/***/ }),

/***/ 4665:
/***/ ((module) => {

"use strict";
module.exports = require("react-nextjs-toast");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [675], () => (__webpack_exec__(5002)));
module.exports = __webpack_exports__;

})();