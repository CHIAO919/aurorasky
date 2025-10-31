// src/fontawesome.js
import { config, library } from '@fortawesome/fontawesome-svg-core';
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// 挑選要用的 icon
import { faUser, faHome, faUserPlus, faRightToBracket, faBars, faXmark, faChevronDown, faChevronRight, faChevronLeft, faIdCard, faGift, faSuitcase, faPersonWalkingLuggage, faPlaneDeparture, faGaugeSimpleHigh, faUsers, faDoorOpen, faPlane, faPhone, faPhoneVolume, faLocationDot, faCircleExclamation, faFileCirclePlus, faFileCircleCheck, faPlaneUp, faPlaneCircleCheck, faPlaneArrival, faArrowRight, faWifi, faUtensils, faTv, faBanSmoking, faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCircleUser, faFile } from "@fortawesome/free-regular-svg-icons";

// 把 icon 放進 library
library.add(faUser, faHome, faGithub, faUserPlus, faCircleUser, faRightToBracket, faBars, faXmark, faChevronDown, faChevronRight, faChevronLeft, faIdCard, faGift, faSuitcase, faPersonWalkingLuggage, faPlaneDeparture, faGaugeSimpleHigh, faUsers, faDoorOpen, faPlane, faPhone, faPhoneVolume, faLocationDot, faCircleExclamation, faFile, faFileCirclePlus, faFileCircleCheck, faPlaneUp, faPlaneCircleCheck, faPlaneArrival, faArrowRight, faWifi, faUtensils, faTv, faBanSmoking, faCheck, faCircleCheck);