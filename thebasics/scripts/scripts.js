var myVariable = "value";
var stringPartLetters = "letters";
var stringPartNumbers = "numbers";
var stringPartCharacters = "characters";
var myFullString = "A string may contain as many "+stringPartLetters+", "+stringPartNumbers+" and "+stringPartCharacters+" as you want.";
console.log(myFullString);

var count = 10;
var multiplier = 20;

var calculateVariables = "I have "+(count * multiplier)+" friends on 'facebook'.";  
console.log(calculateVariables);
var stringYear = "In the year " + multiplier.toString() + count.toString() + ", most of us were 3 years old.";
console.log(stringYear);

var myColorArray = ['Orange', 'Red', 'Blue', 'Green'];
var myColor = "My favorite color is " + myColorArray[2];
console.log(myColor);

var myFruitColorArray = [ ['Apples', 'Bannanas', 'Grapes'], ['Red', 'Blue', 'Green' ] ];
var myFruitColor = "I like "+myFruitColorArray[0][1]+" because they are "+myFruitColorArray[1][1];
console.log(myFruitColor);

var gemString = "Gem colors: ";
var myGemColorArray = [ ['Ruby', 'Saphire', 'Emerald'], ['Red', 'Blue', 'Green'] ];
for(var i = 0; i < myGemColorArray[0].length; i++){
    gemString += "The " + myGemColorArray[0][1] +" is "+ myGemColorArray[1][i] + ". ";
};
gemString += "Gems come in many colors.";
console.log(gemString);

var myFriendCompare = "";
var myFriendName = "Mike";
var myAge =43;
var myFriendAge = 13;

if(myAge > myFriendAge){
    myFriendCompare = "I am older than "+myFriendName+".";
}else{
    myFriendCompare = myFriendName+" is older than me.";   
}
console.log(myFriendCompare);

function myFirstFunction( _myFriend, _myName, _status ) {
console.log("Hello "+_myFriend +". It is me, "+ _myName +" and this is my "+ _status +" function!");   
}
myFirstFunction('Mike','Pat','first');

function createGallery(element,path,file,alt){
    var liString = "";
    for (var j = 1; j <= 8; j++){ 
        liString += '<li><a href="#self" onclick="showImage(\'' + file + j + '.jpg\');"><image class="photo" alt="' + alt + '-' + j + '" src="' + path + file + j + '.jpg"></a></li>\n';    
    }
    document.querySelector(element).innerHTML = liString;   
}

var galleryContainer = ".photo-gallery";
var imagePath ="/animals/germanshepherd/";
var imageName = "german-shepherd";
var altName = "Pictures of German Shepherds";

createGallery(galleryContainer, imagePath, imageName, altName);
function showImage(argument) {
    var img = "<img src='/animals/germanshepherd/" + argument + "'>";   
    document.querySelector(".gallery-main-image .image-container").innerHTML = img;    
    return false;
};


















































