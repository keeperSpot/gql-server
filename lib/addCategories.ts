import { Server } from '../src/server';
import * as categories from './categories.json';
import { Category } from '../src/apps/categories/categories.entity';
import * as _ from 'lodash';
import { Connection } from 'typeorm/index';

let conn: Connection;


const main = async () => {
   conn = await Server.connectToDB();
   await recursive(categories,null);
   await conn.close().then(()=>console.log('dvb closed'));
}

const insertIntoDb = async(name:string,code:string,representation:string,parent:any )=>{
    const newCategory=new Category();
    newCategory.name=name;
    newCategory.code=code;
    newCategory.representation=representation;
    newCategory.parent=parent;
    try {
        await newCategory.save();
    } catch (error) {
        console.log('fuck');
    }
}

const recursive = async(level:any[],parent:any) =>{
    level.map(async(cat)=>{
        let representation=cat.representation;
        representation=_.kebabCase(representation);
        await insertIntoDb(cat.name, cat.code, representation,parent);
        await recursive(cat.child,cat);
    });
}


main().then(async()=>{
    console.log('Categories Inserted');
}).catch(()=>{
    console.log('Categories not inserted');
});
