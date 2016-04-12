'use strict'

function Model (data) {
  var self = this;

  self.data = data;

  self.addItem = function (item) {

    if (item.length === 0) {
      return;
    }

    self.data.push(item);

    return self.data
  }  

  self.removeItem = function (item) {
    var index = self.data.indexOf(item);

    if (index === -1) {
      return;
    };

    self.data.splice(index, 1);

    return self.data
  }

  self.editItem = function (item, editedItem) {
    var index = self.data.indexOf(item);

    if (index === -1) {
      return;
    };

    self.data.splice(index, 1, editedItem );

    return self.data
  }

}

function View (model) {
  var self = this;

  function init () {
    var wrapper = tmpl($('#wrapper-template').html());

    $('body').append(wrapper);

    self.elements = {
      input: $('.item-value'),
      addBtn: $('.item-add'),
      listContainer: $('.item-list')
    };
    self.renderList(model.data);
  };


  self.renderList = function (data) {
    var list = tmpl($('#list-template').html(), {data: data});
    self.elements.listContainer.html(list);
  }

  init();

  // show confirm edit btn
  self.elements.listContainer.on('focus', '.item-input', function () {
    $(this).siblings('.item-delete').fadeOut( 'fast', function () {
      $(this).siblings('.item-edit').fadeIn('fast');
    });
    
  });
  self.elements.listContainer.on('focusout', '.item-input', function () {
    $(this).siblings('.item-edit').fadeOut( 'fast', function () {
      $(this).siblings('.item-delete').fadeIn('fast');
    });
  });

}

function Controller (model, view) {
  var self = this;

  view.elements.addBtn.on('click', addItem);
  view.elements.listContainer.on('click', '.item-delete', removeItem);
  view.elements.listContainer.on('focus', '.item-input', getItemValue);
  view.elements.listContainer.on('click', '.item-edit', editItem);

  function addItem () {
    var newItem = view.elements.input.val();
    model.addItem(newItem);
    view.renderList(model.data);
    view.elements.input.val('');
  }

  function removeItem () {
    var item = $(this).attr('data-value');
    console.log($(this));
    model.removeItem(item);
    view.renderList(model.data);
    console.log(item);
  }

  function getItemValue () {
    self.itemValue = $( this ).val();
  }

  function editItem () {
    self.editedValue = $(this).siblings('input').val();
    model.editItem(self.itemValue, self.editedValue);
    view.renderList(model.data);
  }
}

$(document).ready(function() {
  var firstToDoList = ['test1', 'test2', 'test3'];
  var model = new Model(firstToDoList);
  var view = new View(model);
  var controller = new Controller(model, view);
 
});

