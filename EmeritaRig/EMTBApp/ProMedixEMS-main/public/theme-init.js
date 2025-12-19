// Apply saved theme ASAP to prevent flash
(function(){
  try {
    var t = localStorage.getItem('theme');
    var root = document.documentElement;
    if (t === 'dark') root.classList.add('dark');
    else if (t === 'light') root.classList.remove('dark');
  } catch (e) {}
})();
