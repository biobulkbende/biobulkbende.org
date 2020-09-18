import $ from 'jquery';

class MobileMenu{

	constructor(){
		this.siteHeader = $(".site-header");
		this.menuIcon = $(".site-header__menu-icon");
		this.menuContent = $(".site-header__menu-content");
		this.siteHeaderLogo= $(".site-header__logo");
		this.events();
	}

	events(){
		this.menuIcon.click(this.toggleTheMenu.bind(this)); 
	}

	toggleTheMenu(){
		this.menuContent.toggleClass("site-header__menu-content--is-visible");
		this.siteHeader.toggleClass("site-header--is-expanded");
		this.menuIcon.toggleClass("site-header__menu-icon--close-x");
		this.siteHeaderLogo.toggleClass("site-header__logo--orange-bg");

	}
}
 
export default MobileMenu;