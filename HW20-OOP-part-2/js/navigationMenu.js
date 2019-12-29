function selectNavigationItem() {
  let selectedMenuItem = document.querySelector('.navigation--selected-menu-link');
  const navigation = document.querySelector('.navigation__right-list');
  navigation.addEventListener('click', (event) => {
    if (selectedMenuItem) {
      selectedMenuItem.classList.remove('navigation--selected-menu-link');
    }
    selectedMenuItem = event.target.closest('a');
    selectedMenuItem.classList.add('navigation--selected-menu-link');
  });
  const toTop = document.querySelector('.to-top');
  toTop.addEventListener('click', () => {
    if (selectedMenuItem) {
      selectedMenuItem.classList.remove('navigation--selected-menu-link');
    }
    const link = document.getElementById('blogPage');
    link.classList.add('navigation--selected-menu-link');
    selectedMenuItem = link;
  });
}
selectNavigationItem();