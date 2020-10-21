import $ from 'jquery';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';

var mobileMenu = new MobileMenu();
new RevealOnScroll($(".how-it-works-1"), "79%");
new RevealOnScroll($(".how-it-works-2, .how-it-works-3"), "90%");
var stickyHeader = new StickyHeader();