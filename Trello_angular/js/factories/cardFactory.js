angular.module('app').factory('cardFactory', function () {
	var service = {};

	var cards = [
		{
			id:1,
			description: 'Lear ReactJS',
			list_id: 1
		},
		{
			id:2,
			description: 'Lear AngularJS',
			list_id: 2
		},
		{
			id:3,
			description: 'Create Portfolio',
			list_id: 3
		},
	]

	service.getCards = function (list) {
		// console.log(_.filter(cards, { list_id: list.id}));
		return _.filter(cards, { list_id: list.id});
	}

	service.createCard = function (list, cardDescription) {
		if (cardDescription) {
			cards.push({
				id: _.uniqueId('card_'),
				description: cardDescription,
				list_id: list.id
			})
		}

	}

	service.deleteCard = function (card) {
		return _.pull(cards, card)
	}

	service.updateCard = function (updatingCard) {
		console.log('update');
		var card = _.findWhere(cards, {id: updatingCard.id});
		card.description = updatingCard.description;
		card.list_id = updatingCard.list_id;
	}

	return service;
})
