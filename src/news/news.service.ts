import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { New, NewDocument } from 'src/db-schema/new.schema';

@Injectable()
export class NewsService {
    constructor(@InjectModel(New.name) private newModel: Model<NewDocument>) {}
    async getAllNews(): Promise<New[]> {
        return await this.newModel.find().sort({'date': -1})
    }
}
