double m = 3.5, aux = 0.0;
double suma(double i, int j);

int main(void){
    int i;
    if (i == 0) {
        int j;
        for (j=0; j<100; j++) {
            int i;
            i = m * 2;
            aux = suma(i, j);
        }
    }
    return suma(suma(aux,i),j);
}

double suma(double i, int j){
    return i + j;
}