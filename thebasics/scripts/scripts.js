var myVariable = "value";
var stringPartLetters = "letters";
var stringPartNumbers = "numbers";
var stringPartCharacters = "characters";
var myFullString = "A string may contain as many "+stringPartLetters+", "+stringPartNumbers+" and "+stringPartCharacters+" as you want.";
console.log(myFullString);
var count = 10;
var multiplier = 20;
var calculateVariables = "I have "+(count * multiplier)+" friends on 'facebook'";
console.log(calculateVariables);
var stringYear = "In the year " + multiplier.toString() + count.toString() + ", most of us were over 3 years old.";
console.log(stringYear);
var myColorArray = ['Orange', 'Red', 'Yellow', 'Green'];
var myColor = "My favorite color is " + myColorArray[2];
console.log(myColor);
var myFruitColorArray = [ ['Apples', 'Bannanas', 'Grapes'] , ['Red', 'Yellow', 'Green'] ];
var myFruitColor ="I like "+myFruitColorArray[0][2]+" because they are "+myFruitColorArray[1][2];
console.log(myFruitColor);
var gemString = "Gem colors: ";
var myGemColorArray = [ ['Ruby','Saphire','Emerald'], ['Red','Blue','Green'] ];
for(var i = 0; i < myGemColorArray[0].length; i++){ 
    gemString += "The " + myGemColorArray[0][i] +" is "+ myGemColorArray[1][i] + ". ";
};
gemString += "Gems come in many colors.";
console.log(gemString);
var myFriendCompare = "";
var myFriedName = "Mike";
var myAge = 12;
var myFriendAge = 13;
if(myAge > myFriendAge){ 
    myFriendCompare = "I am older than "+myFriendName+".";
}
    else{ 
        myFriendCompare = myFriendName+" is older than me.";   
}
console.log(myFriendCompare);