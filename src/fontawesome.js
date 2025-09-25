// src/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';

// 挑選要用的 icon
import { faUser, faHome, faUserPlus, faRightToBracket, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

// 把 icon 放進 library
library.add(faUser, faHome, faGithub, faUserPlus, faCircleUser, faRightToBracket, faBars, faXmark)