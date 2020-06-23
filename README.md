# Gestion_bancaire

Les Fonctions constructeurs :

    1) Fonction constructeur Adresse qui prend en arguments les cordonnés de l'adresse e return une adresse construite en objet.
       
    2) Fonction constructeur client qui prend en arguments les information du client est compris l'adresse construite précédemment est return un objet construit qui contient :
    3) 
    • Les informations : nom ,prénom , date de naissance, mail, téléphone.
    • L'adresse : un objet Adresse.
    • Un  identifient : une fonction récursive qui généré arbitrairement un identifient de  10 chiffres s’il n’existe pas dans le tableau référence  des clients.
    • Les Comptes du client : défini par un tableau vide au départ et associé avec une méthode (expliqué en bas).


    4) Fonction constructeur compte qui prend en arguments le solde le client "qui est un objet prés construit" et la date de création. Elle return un objet construit de :

    • L'IBAN: pour le moment on généré un nombre arbitraire de 23 chiffres et le code de la France suivie de la clé IBAN.
    • Le solde.
    • Le client associé au compte.
    • L’identifient du compte : il se compose de l’identifient client et de la taille du tableau comptes plus un au moment de la création.
    • La date de création du compte.
    • Le découvert : c’est un fonction qui return le découvert autorisé en fonction du solde du client.
    • L’historique des opérations:au moment de la construction c’est un tableau vide qui contient douze tableau vide (les mois de l’année).Il sera remplie avec les opérations a l’aide d’une méthode(expliqué en bas).


    5)   Fonction constructeur opération qui prend en arguments les caractéristiques d’une opération et sa valeur. Elle return un objet construit de :
       
    • La date de l’opération.
    • Le jour de la valeur: utilisé pour remplir le tableau historique des opérations .
    • Le mois de la valeur : utilisé pour remplir le tableau historique des opérations .
    • L’année de la valeur.
    • Le libelle.
    • Le débit ou crédit: soit plus ou mois pour calculer le solde.
    • La valeur de l’opération.
    • Le solde : initiée a zéro puis remplie par le solde après opération avec un méthode (expliqué en bas).

       
    6) Fonction constructeur statique teste Banque qui teste certaines conditions chez les clients et leurs comptes et stocke certaines informations.

Les Méthodes :
Client :

    • Nombre de comptes : a l’aide de la taille du tableau comptes elle return le nombre de comptes.
    • Afficher identifient : affiche l’identifient construit précédemment.
    • Afficher solde globale du client:  parcoure le tableau comptes, calcule le solde de tous les comptes et return la somme.
    • Afficher solde spécifique :  prend en argument un compte et return son solde
    • Virement compte perso : elle prend en argument deux comptes le créditeur et le débiteur et la somme a envoyer. Elle change le solde des deux comptes.
    • Virement compte tiers :  prend en argument la somme à envoyer et le compte du client. Elle retire la somme du compte.
    • Déposer espèces : prend en argument le compte et les espèces à déposer et ajoute la somme au solde du compte.
    • Retirer espèces : prend en argument le compte et les espèces à retirer et réduit la somme au solde du compte.
    • Dépose chèque : prend en argument le compte et la somme du chèque à déposer et ajoute  la somme au solde du compte.
    • Faire chèque : prend en argument le compte et la somme du chèque à retirer et réduit la somme au solde du compte.
Compte :

    • Associer: prend en argument le client. Elle teste le nombre de compte possible à l’aide de la méthode catégorie client de test banque et ajoute le compte au tableau comptes si les cases du tableau sont inférieures aux nombre de comptes possible, qui correspond au résultat de le fonction catégorie client plus deux. 
    • État solde :return le solde du compte.
    • Solde après opération:prend en argument une opération. Elle change le solde a l’aide de la fonction eval() 
    • Gérer historique: prend en argument une opération. Elle ajoute l’opération au tableau qui correspond au mois dans le tableau de l’historique.
    • Agios : prend en argument le mois pour calculer l’agio et return l’agio. Explication du fonctionnement :
        ◦ Création des variables :
            ▪ Nombre débiteur : un conteneur qu’on lui rajoute a chaque fois le calcule du nombre débiteur si le solde de l’objet opération est négatif.
            ▪ O,P,N : contiennent à chaque fois la taille du tableau visé pour une meilleure lisibilité.
        ◦ Calculer les nombres débiteurs :
            ▪ On gère le cas le découvert a commencé à partir du mois précédent, cela signifie que le nombre de jours depuis que le découvert a commencé correspond a l’élément jour de la valeur dans la première opération du mois et le solde correspond au solde de la dernière opération du mois précédent. Sauf pour le mois de janvier ou le solde correspond au solde du dernier objet de la dernière case du tableau qui est le mois de décembre.
            ▪ On parcours les objets(opération) du tableau du mois jusqu’à la case n-1(la dernier objet sera géré tout seul) et on calcule le nombre débiteur si le solde est négatif. Le nombre de jours correspond au nombre de jours de l’opération suivante moins le nombre de jours de l’opération en cours et le solde c’est le solde du mois en cours.
            ▪ On gère le cas de la dernière opération. On fixe une variable nombre de jours à 31  qu’on change à 30 pour les mois 3,5,8,10 du tableau et à 28 pour la case 1 si le mois n’est pas bissextile et à 29 si l’année est bissextile.Le nombre de jours du découvert correspond alors à la valeur de la variable nombre de jours mois le nombre de jours de la dernière opération du mois.
      Remarque : on peut créer une méthode suprimerMoisSuivent qui a l’aide de la fonction date vide la case du mois qui suit une fois arrivé au dernier jour du mois en cours. Comme ça en garde un historique des douze derniers mois.
Teste banque :

    • Catégorie client :return un numéro entre 0 et 3 par rapport au solde du client.
    
    • Test compte créditeurs 30 jours: prend en argument le compte à vérifier et le mois de départ du calcul et return true ou false(elle utilise la même façon que de la méthode calcule des agios, Sauf qu’on parcoure plusieurs mois au lieu de un et on ne calcule que le nombre de jours.
    
    • Ajouter Référence : ajoute la référence du client au tableau référence client.
                                             
                                                                                                               Feres  BEN GAMRA 
