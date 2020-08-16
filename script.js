class Hotel {
  constructor(size) {
    this.size = size;
    this.dodajUNiz();
  }

  nizSoba = [];

  //inicijalizacija soba u zavisnosti od velicine
  dodajUNiz() {
    for (let i = 0; i < this.size; i++) {
      this.nizSoba.push([]);
    }
  }

  booking(start, end) {
    if (start < 0 || end > 365) {
      console.log('declined');
    } else {
      for (let i = 0; i < this.nizSoba.length; i++) {
        //odsecak predstavlja period rezervacije
        let odsecak = this.nizSoba[i].slice(start, end + 1);
        if (odsecak.includes('x') == false) {
          //pretpostavka je da prednost imaju sobe sa vise popunjenih datuma
          //kako bi doslo do maksimalne optimizacije
          let indexNajzauzetijeSobe = 0;

          for (let j = 1; j < this.nizSoba.length; j++) {
            if (this.nizSoba[0].length == 0) {
              indexNajzauzetijeSobe = 0;
              break;
            }

            let zauzetihSobaJ = 0;
            let zauzetihSobaI = 0;
            //odredjivanje sobe sa vise zauzetih datuma
            if (i != j) {
              for (let z = 0; z < this.nizSoba[j].length; z++) {
                if (this.nizSoba[j][z]) {
                  zauzetihSobaJ++;
                }
              }
              for (let z = 0; z < this.nizSoba[i].length; z++) {
                if (this.nizSoba[i][z]) {
                  zauzetihSobaI++;
                }
              }
            }
            if (Math.max(zauzetihSobaI, zauzetihSobaJ) == zauzetihSobaI) {
              indexNajzauzetijeSobe = i;
              break;
            } else {
              indexNajzauzetijeSobe = j;
              break;
            }
          }
          //provera da li najzauzetija soba ima slobodnih datuma
          let odsecak1 = this.nizSoba[indexNajzauzetijeSobe].slice(
            start,
            end + 1
          );
          if (odsecak1.includes('x') == true) {
            indexNajzauzetijeSobe = i;
          }

          // napravi rezervaciju
          for (let j = start; j < end + 1; j++) {
            this.nizSoba[indexNajzauzetijeSobe][j] = 'x';
          }

          console.log('accepted');
          return;
        }
      }
      console.log('declined');
    }
  }
}

let reservation1 = new Hotel(1);
let reservation2 = new Hotel(3);
let reservation3 = new Hotel(3);
let reservation4 = new Hotel(3);
let reservation5 = new Hotel(2);
//test1 --size=1
console.log('test1');
reservation1.booking(-4, 2);
reservation1.booking(200, 400);
console.log('-----------');

//test2 --size=3
console.log('test2');
reservation2.booking(0, 5);
reservation2.booking(7, 13);
reservation2.booking(3, 9);
reservation2.booking(5, 7);
reservation2.booking(6, 6);
reservation2.booking(0, 4);
console.log('-----------');

//test3-- size=3
console.log('test3');
reservation3.booking(1, 3);
reservation3.booking(2, 5);
reservation3.booking(1, 9);
reservation3.booking(0, 15);
console.log('-----------');

//test4--size=3
console.log('test4');
reservation4.booking(1, 3);
reservation4.booking(0, 15);
reservation4.booking(1, 9);
reservation4.booking(2, 5);
reservation4.booking(4, 9);
console.log('-----------');

//test5--size=2
console.log('test5');
reservation5.booking(1, 3);
reservation5.booking(0, 4);
reservation5.booking(2, 3);
reservation5.booking(5, 5);
reservation5.booking(4, 10);
reservation5.booking(10, 10);
reservation5.booking(6, 7);
reservation5.booking(8, 10);
reservation5.booking(8, 9);
console.log('-----------');
