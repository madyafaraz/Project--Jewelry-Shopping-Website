import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'imageFilter'})

export class ImageFilterPipe implements PipeTransform{

	transform(items:any[], term:string) : any {
		if(term === '' || term === null) {return items}
		else{
			return items.filter(item =>{
				return item.name.includes(term);
			});
		}

	}

}