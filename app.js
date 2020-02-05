class Image {
	constructor(name,image,clicks) {
		this.name = name
		this.image = image;
		this.clicks = clicks;
	}
	addClick() {
		this.clicks += 1;
	}
}

var model = {
	init: function() {
		this.imageArray = new Array();
		this.imageLength = 9;
		for (let i=0; i < this.imageLength; i ++) {
			var url = 'images/cat' + (i+1) + '.jpg';
			var newImage = new Image('Cat - ' + (i+1),url,Number(0));
			this.imageArray.push(newImage);
		}
	},

	getImages: function() {
		return this.imageArray;
	},

	addClick: function(index) {
		this.imageArray[index].addClick();
	},

	setName: function(index, newName) {
		this.imageArray[index].name = newName;
	},

	setURL: function(index, newURL) {
		this.imageArray[index].image = newURL;
	},

	setClicks: function(index, newClicks) {
		if (!Number.isInteger(newClicks)) {
			alert('Please enter a number...');
		} else {
			this.imageArray[index].clicks = Number(newClicks);
		}
	},

	addImage: function(name,url) {
		var newImage = new Image(name,url,Number(0));
		this.imageArray.push(newImage);
	},

	deleteImage: function(index) {
		this.imageArray.splice(index,1);
	}
};

var controller = {
	init: function() {
		model.init();
		view.init();
	},

	getImages: function() {
		return model.getImages();
	},

	addClick: function(index) {
		model.addClick(index);
		view.renderData();
	},
	
	setName: function(index, newName) {
		model.setName(index, newName);
		view.renderData();
		view.renderSelector();
	},

	setURL: function(index, newURL) {
		model.setURL(index, newURL);
		view.renderData();
		view.renderSelector();
	},

	setClicks: function(index, newClicks) {
		model.setClicks(index, Number(newClicks));
		view.renderData();
		view.renderSelector();
	},

	addImage: function(name,url) {
		model.addImage(name,url);
		view.renderSelector();
	},

	deleteImage: function(index) {
		model.deleteImage(index);
		view.renderSelector();
		view.renderData();
	},

	reset: function() {
		model.init();
	}
};

var view = {
	init: function() {
		view.renderSelector();
		view.renderData();

		// current image click event
		var currentImage = document.getElementById('currentImage');
		currentImage.addEventListener('click', function() {
			var index = currentImage.getAttribute('class');
			controller.addClick(index);
		});

		// selector change event
		var selector = document.getElementById('selector');
		selector.addEventListener('change', view.renderData);

		// admin button click event
		var adminButton = document.getElementById('adminButton');
		var inputsDiv = document.getElementById('inputs');
		adminButton.addEventListener('click', function() {
			if (inputsDiv.style.display === 'none') {
				inputsDiv.style.display = 'flex';
			} else {
				inputsDiv.style.display = 'none';
			}
		});

		// name button click event
		var nButton = document.getElementById('nameBut');
		var nBox = document.getElementById('nameIn');
		nButton.addEventListener('click', function () {
			var index = currentImage.getAttribute('class');
			controller.setName(index, nBox.value);
			nBox.value = "";
		});

		// url button click event
		var uButton = document.getElementById('urlBut');
		var uBox = document.getElementById('urlIn');
		uButton.addEventListener('click', function () {
			var index = currentImage.getAttribute('class');
			controller.setURL(index, uBox.value);
			uBox.value = "";
		});

		// clicks button click event
		var cButton = document.getElementById('clicksBut');
		var cBox = document.getElementById('clicksIn');
		cButton.addEventListener('click', function () {
			var index = currentImage.getAttribute('class');
			controller.setClicks(index, Number(cBox.value));
			cBox.value = "";
		});

		// add button click event
		var aButton = document.getElementById('addBut');
		aButton.addEventListener('click', function () {
			var name = document.getElementById('addName');
			var url = document.getElementById('addURL');
			var selectorLength = selector.length;
			controller.addImage(name.value,url.value);
			name.value = "";
			url.value = "";
			selector.selectedIndex = selectorLength;
			view.renderData();
		});

		// delete button click event
		var dButton = document.getElementById('delBut');
		dButton.addEventListener('click', function () {
			var currentIndex = selector.selectedIndex;
			controller.deleteImage(currentIndex);
		});

		// reset button click event
		var rButton = document.getElementById('resetButton');
		rButton.addEventListener('click', function() {
			var nameText = document.getElementById('addName');
			var urlText = document.getElementById('addURL');
			controller.reset();
			view.renderSelector();
			selector.selectedIndex = 0;
			view.renderData();
			nameText.value = "Enter Name";
			urlText.value = "Enter Image URL";

		});
	},

	renderSelector: function() {
		var images = controller.getImages();
		var selector = document.getElementById('selector');
		selector.innerHTML = "";

		for (let i=0; i < images.length; i++) {
			var option = document.createElement('option');
			option.text = images[i].name;
			selector.appendChild(option);
		}

		var index = currentImage.getAttribute('class');
		selector.selectedIndex = index;
	},

	renderData: function() {
		var images = controller.getImages();
		var selector = document.getElementById('selector');
		var currentIndex = selector.selectedIndex;
		var currentImage = document.getElementById('currentImage');
		var imageName = document.getElementById('currentName');
		var imageClicks = document.getElementById('currentClick');

		if (images[currentIndex] === undefined) {
			currentImage.src = "images/logo.jpg";
			imageName.innerHTML = "";
			imageClicks.innerHTML = "";
		} else {
			currentImage.src = images[currentIndex].image;
			currentImage.setAttribute('class',currentIndex);
			imageName.innerHTML = 'Name: ' + String(images[currentIndex].name);
			imageClicks.innerHTML = 'Clicks: ' + String(images[currentIndex].clicks);
		}

	}
};
controller.init();
