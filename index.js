class Translator {

    constructor() {
        this.letterRegExp = /[a-zA-Z]/g;
        this.vowelRegExp = /[aeiouyAEIOUY]/g;
        this.consonantRegExp = /[bcdfghjklmnpqrstvwxs]/gi;
        this.punctuationRegExp = /[.,\/#!$%\^&\*;:{}=\-_`~()]/g;
        this.prefix = '';
        this.stem = '';
        this.output = '';
        this.capitalLetter = false;
        this.punctuation = '';
        this.hasConsonant = true;
    }

    isWord(word){
        return this.letterRegExp.test(word) ? true : false;
    }

    isCapitalLetter(letter){
        if (letter === letter.toUpperCase()) return true;
        return false;
    }

    separateWordInPrefixAndStem(word){
        console.log(word);
        for (let i = 0 ; i < word.length ; i++){
            if (i === 0){
                this.capitalLetter = this.isCapitalLetter(word[i])
                console.log(this.vowelRegExp.test(word[i]));
            } 
            if (!this.vowelRegExp.test(word[i])) this.prefix = this.prefix + word[i];
            else {
                if (this.punctuationRegExp.test(word[word.length - 1])){
                    this.punctuation = word[word.length - 1];
                    this.stem = word.substr(i, word.length - 2);
                }
                else this.stem = word.substr(i);
                if (i === 0 && !this.consonantRegExp.test(this.stem)) {
                    this.prefix = '';
                    this.hasConsonant = false;
                }
                break;
            }
        }
    }

    setUpNewWord(){
        if (this.prefix.length !== 0 || this.hasConsonant){
            if (this.capitalLetter) {
                this.prefix = this.prefix[0].toLowerCase() + this.prefix.substring(1);
                this.stem = this.stem[0].toUpperCase() + this.stem.substring(1);
            }
            return `${this.stem}${this.prefix}ay${this.punctuation} `;
        }
        else {
            return `${this.stem}yay${this.punctuation} `
        }
    }

    translateWord(word){
        this.prefix = '';
        this.stem = '';
        this.capitalLetter = false;
        this.punctuation = '';
        this.hasConsonant = true;
        
        if (!this.isWord(word)) return `${word} `; 
        this.separateWordInPrefixAndStem(word);
    
        return this.setUpNewWord();   
    }

    translate(input){
        var words = input.split(' ');
        words.map(word => {
            this.output = `${this.output}${this.translateWord(word)}` 
        })
    
        return this.output;
    }    
    
}

const translator = new Translator();
console.log(translator.translate('Hey buddy, get away from my car!'));