var myVariable = "value";

var stringPartLetters = "letters";
var stringPartNumbers = "numbers";
var stringPartCharacters = "characters";

var myFULLstring = "A string may contain as meny "+stringPartLetters+", "+stringPartNumbers+" and "+stringPartCharacters+" as you want.";

console.log(myFULLstring);

var count = 10;
var multiplier = 2010;

var calculateVariables = "I have "+(count * multiplier)+" freinds on 'facebook'.";
console.log(calculateVariables);

var stringYear = "In the year " + multiplier.toString() + ", most of us where over 3 years old.";
console.log(stringYear);

var myColorarray = ['Orange', 'Red', 'Yellow', 'Green'];

var myColor = "My favorite color is " + myColorarray[3];
console.log(myColor);

var myFruitColorArray = [  ['Apples','Bannanas','Grapes'],['Red', 'Yellow', 'Green']  ];

var myFruitColor = "I like "+myFruitColorArray[0][1]+" because they are "+myFruitColorArray[1][1];
console.log(myFruitColor);

var gemString = "gem colors: ";

var mygemColorArray = [  ['Ruby','Saphire','Emerald'],   ['Red', 'Blue', 'Green'] ];

for(var i = 0; i < mygemColorArray[0].length; i++){
        gemString += "the " + mygemColorArray[0][i] +" is "+ mygemColorArray[1][i] + ". "; 
   };
   
   gemString += "Gems come in many colors.";
   console.log(gemString);
   
   var myFriendCompare = "";
   var myFriendName = "Jacob hahaha!";
   var myAge = 13;
   var myFriendAge =2;
   
   if(myAge > myFriendAge){
        myFriendCompare = "I am older than "+myFriendName+".";
    }else{
       myFriendCompare = myFriendName+" is older than me."; 
    }
    console.log(myFriendCompare);
    
    function myFirstFunction( _myFriend, _myName, _status ) {
        console.log("Hello "+_myFriend +". It is me, "+ _myName +" and this is my "+_status +" function!");    
    }
    myFirstFunction('Jacob','Eli','first');
    
    function createGallery(element,path,file,alt){
        var liString = "";   
        for (var j = 1; j <= 8; j++) {
                liString += '<li><a Href="#self" onclick="showImage(\'' + file + j + '.jpg\');"><img class="photo" alt="' + alt + '-' + j + '" src="' + path + file + j + '.jpg"></a></li>\n';
            }
            document.querySelector(element).innerHTML = liString;
    }
    
    var galleryContainer = ".photo-gallery";
    var imagePath = "/animals/owls/";
    var imageName = "owl";
    var altName = "owl images are awesome";
    
    createGallery(galleryContainer, imagePath, imageName, altName);
    
    function showImage(argument) {
        var img = "<img src='/animals/owls/" + argument + "'>";
        document.querySelector(".gallery-main-image .image-container").innerHTML = img;
    };


















