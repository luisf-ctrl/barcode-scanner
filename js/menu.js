function UCAccordionMenu(menuWrapperID){var g_menuWrapper,g_isCloseOnOpen=!1,g_isCurrentParentItemOpened=!1,g_dataStartClosedAlways;var isInited=!1;function collapseInnerSection(element,link){var sectionHeight=element.scrollHeight;var elementTransition=element.style.transition;element.style.transition='';var currentLocation=window.location.href;var objLinkItemHref=jQuery(link).attr('href');if(currentLocation==objLinkItemHref&&g_isCurrentParentItemOpened==!1&&g_dataStartClosedAlways==!1){element.setAttribute('data-collapsed','false');g_isCurrentParentItemOpened=!0;return(!0)}
requestAnimationFrame(function(){element.style.height=sectionHeight+'px';element.style.transition=elementTransition;requestAnimationFrame(function(){element.style.height=0+'px'})});element.setAttribute('data-collapsed','true')}
function expandSectionInner(element){var sectionHeight=element.scrollHeight;element.style.height=sectionHeight+'px';element.addEventListener('transitionend',function(e){element.removeEventListener('transitionend',arguments.callee);element.style.height=null});element.setAttribute('data-collapsed','false')}
function expandSection(section,objLink){expandSectionInner(section);section.setAttribute('data-collapsed','false')
objLink.removeClass("collapsed");objLink.addClass("expanded")}
function collapseSection(section,objLink){collapseInnerSection(section,objLink);objLink.addClass("collapsed");objLink.removeClass("expanded")}
function collapseAllExpanded(clickedItem){var clickedParentExpanded=jQuery(clickedItem).parents('.sub-menu').prev();var clickedChildrenExpanded=jQuery(clickedItem).next().find('.expanded');var objAllExpanded=g_menuWrapper.find(".expanded").not(clickedChildrenExpanded).not(clickedParentExpanded);if(objAllExpanded.length==!1)
return(!1);jQuery.each(objAllExpanded,function(index,link){var objLink=jQuery(link);var section=link.nextElementSibling;collapseSection(section,objLink)})}
function toggleSection(objLink){var link=objLink[0];var section=link.nextElementSibling;var isCollapsed=section.getAttribute('data-collapsed')==='true';if(isCollapsed){if(g_isCloseOnOpen==!0)
collapseAllExpanded(link);expandSection(section,objLink)}else{collapseSection(section,objLink)}}
function openCloseItem(link,event){var section=link.nextElementSibling;if(!section)
return(!0);var objSection=jQuery(section);if(objSection.hasClass("sub-menu")==!1)
return(!0);if(event)
event.preventDefault();var objLink=jQuery(link);var isCollapsed=section.getAttribute('data-collapsed')==='true';if(isCollapsed){if(g_isCloseOnOpen==!0)
collapseAllExpanded(link);expandSection(section,objLink)}else{collapseSection(section,objLink)}}
function onMenuItemClick(event){openCloseItem(this,event)}
function trace(str){console.log(str)}
function checkInitFromPopups(){jQuery(document).on('elementor/popup/show',(event)=>{runMenu()})}
function expandCurrentItemTree(){var objCurrentItem=g_menuWrapper.find(".uc-list-menu ul .current-menu-item");if(objCurrentItem.length==0)
return(!1);g_menuWrapper.addClass("uc-no-transition");setTimeout(function(){g_menuWrapper.removeClass("uc-no-transition")},300);var objParents=objCurrentItem.parents("li");if(objParents.length==0)
return(!1);jQuery.each(objParents,function(index,parent){var objParent=jQuery(parent);var objLink=objParent.children("a");var link=objLink[0];openCloseItem(link)})}
function runMenu(){g_menuWrapper=jQuery("#"+menuWrapperID);g_dataStartClosedAlways=g_menuWrapper.data('start-closed-always');g_isCloseOnOpen=g_menuWrapper.data("closeothers");g_isCloseOnOpen=(g_isCloseOnOpen=="yes");var isClickable=g_menuWrapper.data("clickable");if(g_menuWrapper.length==0){console.log("menu with ID: "+menuWrapperID+" not found!");checkInitFromPopups();return(!1)}
g_menuWrapper.find("ul.uc-list-menu li a").each((i,item)=>{if(item.nextElementSibling){var objItem=jQuery(item);var objItemPointer=objItem.find('.uc-menu-item-pointer');if(objItemPointer.length==0)
objItem.append("<span class='uc-menu-item-pointer'></span>");var currentLocation=window.location.href;var objLinkItemHref=jQuery(item).attr('href');if(currentLocation==objLinkItemHref&&g_isCurrentParentItemOpened==!1&&g_dataStartClosedAlways==!1){collapseInnerSection(item.nextElementSibling,item);item.nextElementSibling.style.display="block";jQuery(item).addClass("expanded");jQuery(item).removeClass("collapsed");return(!0)}
collapseInnerSection(item.nextElementSibling,item);item.nextElementSibling.style.display="block";jQuery(item).addClass("collapsed");jQuery(item).removeClass("expanded")}});if(isClickable==!1){g_menuWrapper.find("ul.uc-list-menu li a").on("click",onMenuItemClick)}else{g_menuWrapper.find("ul.uc-list-menu li .uc-menu-item-pointer").on("click",function(event){event.preventDefault();var objLink=jQuery(this).parent();toggleSection(objLink)})}
setTimeout(expandCurrentItemTree,100);isInited=!0}
if(isInited==!1)
runMenu();jQuery(document).on('uc_burger_popup_open',function(){setTimeout(function(){if(isInited==!1)
runMenu()},50)})}