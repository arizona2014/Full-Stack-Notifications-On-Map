import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    var categoryName:any;
      switch(value){
          case 1:
              categoryName = 'Assistance sociale';
              break;
          case 2:
              categoryName = 'Stockage des déchets';
              break;
          case 3:
              categoryName = 'Construction / travaux non autorisés; organisation du site';
              break;
          case 4:
              categoryName = 'Éclairage public';
              break;
          case 5:
              categoryName = 'Parking';
              break;
          case 6:
              categoryName = 'Sans-abris ou personnes qui font appel au public';
              break;
          case 7:
              categoryName = 'Salubrité';
              break;
          case 8:
              categoryName = 'Espaces verts / parcs';
              break;
          case 9:
              categoryName = 'Rues / Passerelles / Trottoirs / Ponts';
              break;
          case 10:
              categoryName = 'Taxes et impôts';
              break;
          case 11:
              categoryName = 'Signalisation routière';
              break;
          case 12:
              categoryName = "Trouble de l'ordre public";
              break;
          case 13:
              categoryName = 'Autres';
              break;
          case 14:
              categoryName = "Réseaux d'eau / d'assainissement (REA)";
              break;
          case 15:
              categoryName = 'Transport public (TP)';
              break;
          case 16:
              categoryName = 'Stationnement non réglementaire';
              break;
      }
    
    return categoryName;
      
  }

}
