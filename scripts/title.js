window.onfocus = function() {
    document.title = 'Сайт Нубовика';
    console.log(`Вкладка открыта.`);
  };
  
  window.onblur = function() {
    document.title = 'Вернитесь 😭';
    console.log(`Вкладка закрыта.`);
  };
