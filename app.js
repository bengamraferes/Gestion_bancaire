function Adresse (nmero,typeDeVoie,nomDeVoie,commune ,codePosale){
    this.commune=commune,
    this.numero = nmero,
    this.typeDeVoie = typeDeVoie,
    this.nomDeVoie = nomDeVoie,
    this.codePosale = codePosale
}
function Client (nom,prenom,dateDeNaissance,adresse,mail,telephone){
    this.id = function(){
       if (referencesClients.indexOf(chiffreArbitraire(10))==-1){
           return chiffreArbitraire
       }
       else (this.id())
    },
    this.nom =nom,
    this.prenom = prenom,
    this.dateDeNaissance =dateDeNaissance,
    this.adresse = adresse,
    this.mail = mail,
    this.telephone =telephone,
    this.comptes = [];
}
function Compte(solde,client,dateCreation){
    this.iban = function(){
        return "FR33"+chiffreArbitraire(23);
    },
    this.solde =solde,
    this.client = client,
    this.idCompte = (client.id+client.nbComptes())+1,
    this.dateCreation = dateCreation
    this.decouvert = function(){
        let res = 0;
         if (this.etatSolde()>5000){
             res = this.etatSolde()/1000
         }
         return res
    }
    this.historiqueOperation = [[],[],[],[],[],[],[],[],[],[],[],[]]

}
function Operation(dateOperation,jourDeValeur,moisDeValeur,anneeDeValeur,libelle,debitCredit,valeur){
    this.dateOperation = dateOperation,
    this.jourDeValeur = jourDeValeur,
    this.moisDeValeur = moisDeValeur,
    this.anneeDeValeur = anneeDeValeur,
    this.libelle = libelle,
    this.debitCredit =debitCredit,
    this.valeur =valeur,
    this.solde = 0
}
function TesteBanque (){};
function bissextile(annee){
    return (annee % 4 == 0 && annee % 100 !=0 || annee % 400 == 0)
}
function chiffreArbitraire(n){
    let  chifreArbtraire =0
    for(let i = 0; i< n; i++){
        chifreArbtraire= String(chifreArbtraire)+ Math.floor(Math.random() * Math.floor(9));
    }
    return chifreArbtraire
}
Client.prototype.nbComptes = function(){
    return this.comptes.length

}
Client.prototype.afficherId = function(){
   return this.id
}
Client.prototype.afficherSoldeGlobal = function(){
    let res =0;
    for(let i=0;i<this.comptes.length;i++){
         res += this.comptes[i].solde;
         console.log(this.comptes[i])

    }
    return res;
    
}
Client.prototype.afficherSoldeSpecifique = function(compte){
    return compte.solde
    
}
Client.prototype.virementComptePerso = function(compteDebiteur,compteCrediteur,sommeAenvoyer){

     compteCrediteur.solde -= sommeAenvoyer;
     compteDebiteur.solde += sommeAenvoyer
    
}
Client.prototype.virementCompteDeTiers = function(sommeAenvoyer,compte){
     compte.solde -= sommeAenvoyer;
    
}
Client.prototype.deposerEspeces = function(compte,espece){
     compte.solde+= espece;
    
}
Client.prototype.retirerDesEspeces = function(compte,espece){
    compte.solde-= espece;
    
}
Client.prototype.deposerUnCheque = function(compte,cheque){
    compte.solde +=cheque
    
}
Client.prototype.faireUnCheque = function(compte,cheque){
    compte.solde -=cheque
}
Compte.prototype.assosier = function(client){
    // tester le client est pousser le tableau si les condition sont presentes
    let nombreDeComptePossible = TesteBanque.categorieClient(client)+2;
    if(client.comptes.length<= nombreDeComptePossible){
        console.log(this)
        let ajouter = client.comptes.push(this)
    }
}
  
Compte.prototype.etatSolde = function(){
    return this.solde

}
Compte.prototype.soldeApresOperation = function(operation){

   this.solde = eval(this.solde + operation.debitCredit + operation.valeur)
   operation.solde = this.solde
}

Compte.prototype.gererHistorique = function(operation){
    // pousse l'objet opération dans le tableau correspendant du mois comme ca en cree un tableau d'operation pour chaque mois de l'annee.

    let ajouter = this.historiqueOperation[operation.moisDeValeur-1].push(operation)
}
Compte.prototype.agios = function(mois,annee){
     //l faut regarder la valeure de la case precedent du mois si elle est négative est gerer ce cas 
    let nombreDebiteur =0
    let  n = this.historiqueOperation[mois-1].length;
    let  o = this.historiqueOperation[mois-2].length;
    let  p = this.historiqueOperation[11].length;
    if(mois>1 && this.historiqueOperation[mois-2][o-1].solde < 0){
        //gere le cas ou le découvert a commancé a partir du mois precedent
        nombreDebiteur += this.historiqueOperation[mois-1][0].jourDeValeur*((this.historiqueOperation[mois-2][o-1].solde)*(-1))
    }
    else if(mois === 0 && this.historiqueOperation[11][p-1]<0){
        nombreDebiteur += this.historiqueOperation[0][0].jourDeValeur*((this.historiqueOperation[11][p-1].solde)*(-1))
    }
   for(let i =0; i< n-1;i++){
           if (this.historiqueOperation[mois-1][i].solde < 0){
               console.log("la" + this.historiqueOperation[mois-1][i].solde)
            nombreDebiteur +=  (this.historiqueOperation[mois-1][i+1].jourDeValeur - this.historiqueOperation[mois-1][i].jourDeValeur)*((this.historiqueOperation[mois-1][i].solde)*(-1))
           }
       
   }
   if(this.historiqueOperation[mois-1][n-1].solde < 0){
       //grere la derniaire case  
       let nbjours = 31 ;
       if ( mois === 2){
           nbjours =28;
           if(bissextile(annee)){
            nbjours =29;
           }
          
       }
       else if(mois ===  3 || 5 || 8 || 10){
           nbjours == 30
       }
       
       nombreDebiteur +=  (nbjours - this.historiqueOperation[mois-1][n-1].jourDeValeur )*((this.historiqueOperation[mois-1][n-1].solde)*(-1))
   }
   return (nombreDebiteur*20)/(365*100)
}
TesteBanque.categorieClient= function(client){
  let res = 0;
  if (client.afficherSoldeGlobal()>10000){
      res = 1
  }
  if(client.afficherSoldeGlobal()>100000){
      res = 2
  }
  if (client.afficherSoldeGlobal()>1000000){
      res = 3
  }
  return res
}
TesteBanque.compteCrediteur30jours = function(compte,mois){
    //le mois corespend au mois du dépard de calcul
    let res = false;
    let compteur =0;
    let  n = this.historiqueOperation[mois-1].length;
    let  o  = this.historiqueOperation[mois-2].length;
    let  p = this.historiqueOperation[11].length;
    for(let k = mois-1;i<compte.historiqueOperation.length;k++){
        if(mois>1 && this.historiqueOperation[mois-2][o-1].solde < 0){
            //gere le cas ou le découvert a commancé a partir du mois precedent
            compteur = this.historiqueOperation[mois-1][0].jourDeValeur
        }
        else if(mois === 0 && this.historiqueOperation[11][p-1]<0){
            nombreDebiteur += this.historiqueOperation[0][0].jourDeValeur*((this.historiqueOperation[11][p-1].solde)*(-1))
        }
       for(let i =0; i< n-1;i++){
               if (this.historiqueOperation[k][i].solde < 0){
                compteur +=  (this.historiqueOperation[k][i+1].jourDeValeur - this.historiqueOperation[k][i].jourDeValeur)
               }
           
       }
       if(this.historiqueOperation[mois-1][n-1].solde < 0){
        let nbjours = 31 ;
        if ( mois === 2){
            nbjours =28;
            if(bissextile(annee)){
             nbjours =29;
            }
           
        }
        else if(mois ===  3 || 5 || 8 || 10){
            nbjours == 30
        }
          
           compteur +=  (nbjours- this.historiqueOperation[mois-1][n-1].jourDeValeur )
       }

    }
    if (compteur>30){res = true}
    return res

}
TesteBanque.ajouterReferece = function(client,referencesClients){

    let ajouter =referencesClients.push(client.id)
}

var referencesClients = [];
monAdress = new Adresse("15","rue","Truc","Rennes","35000");
monClient = new Client ("feres","Ben Gamra","02/11/1987",monAdress,"feresbengamra@gmail.com","0761897294");
monCompte = new Compte(200,monClient,12/02/2020);
newCompte = new Compte(700,monClient,12/02/2020);
newOperation = new Operation("13/02/2020",15,2,2020,"amazon","-",50)
newOperation1 = new Operation("13/02/2020",17,2,2020,"amazon","-",200)
newOperation2 = new Operation("13/02/2020",20,2,2020,"amazon","-",100)
newOperation3 = new Operation("26/02/2020",28,1,2020,"amazon","-",50)
newOperation4 = new Operation("23/02/2020",23,1,2020,"amazon","+",50)
monCompte.assosier(monClient);
newCompte.assosier(monClient);
monCompte.sodeApresOperation(newOperation);
monCompte.gererHistorique(newOperation);
monCompte.sodeApresOperation(newOperation1);
monCompte.gererHistorique(newOperation1);
monCompte.soldeApresOperation(newOperation2);
monCompte.gererHistorique(newOperation2);
monCompte.soldeApresOperation(newOperation3);
monCompte.gererHistorique(newOperation3);
monCompte.soldeApresOperation(newOperation4);
monCompte.gererHistorique(newOperation4);

console.log(monCompte.agios(2))
console.log( monCompte.historiqueOperation);
console.log (newOperation1.solde)
// console.log("==>"+monClient.comptes[0].solde)
// console.log(monClient.afficherSoldeGlobal())

