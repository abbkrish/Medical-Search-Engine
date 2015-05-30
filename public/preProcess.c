#include <stdio.h>
#include <string.h>
#include <limits.h>

struct contextHashVal {
    int occurrences;
    int *lines;
};

char * makeLower(char *str){
    int i;
    char *newstr = strdup(str);
    for(i = 0; i < strlen(str); i++) {
        if(str[i] > 'A' && str[i] < 'Z')
            newstr[i] = 'a' + (str[i] - 'A');
    }
    return newstr;
}

char **preProcessing(int rarityThresh, int coThresh, char **c1, char **c2,
                    char **sentences, int num_sents, int len_c1, int len_c2)
{
    int idx1, idx2;
    int i;

    idx1 = idx2 = -1;


    if(rarityThresh == -1 && coThresh == -1) {
        return sentences;
    }

    else {
        for(i = 0; i < len_c1; i++) {
            c1[i] = makeLower(c1[i]);
        }
        for(i = 0; i < len_c2; i++) {
            c2[i] = makeLower(c2[i]);
        }
    }

    
    return c1;
}


int main(int argc, char *argv[])
{
    char *categories1[] = {"FUCK this", "c is so lame"};
    char *categories2[] = {"fuck this", "c is so lame"};
    char *sentences[] = {"fuck this", "c is so lame"};
    int num_sents = 2;
    int len_c1 = 2;
    int len_c2 = 2;
    char ** blerb = preProcessing(1, 1, categories1, categories2, sentences, num_sents, len_c1, len_c2);
    int i;
    return 0;
}
