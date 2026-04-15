import { Client } from '@elastic/elasticsearch';
import type { MappingTypeMapping } from '@elastic/elasticsearch/lib/api/types';
import { userIndex, userMapping } from './user/user.mapping';
import { env } from '../config/env';

export const client = new Client({
    node: env.ELASTICSEARCH_NODE || 'http://localhost:9200',
    auth: {
        username: env.ELASTICSEARCH_USERNAME,
        password: env.ELASTICSEARCH_PASSWORD,
    },

    // tls: {
    //   rejectUnauthorized: false // needed for self-signed cert (local dev)
    // }
});

const indexArray = [{ index: userIndex, mapping: userMapping }];

export const createIndex = async (): Promise<void> => {
    await Promise.all(
        indexArray.map(async (indexConfig) => {
            const exists = await client.indices.exists({ index: indexConfig.index });
            if (exists) {
                await client.indices.putMapping({
                    index: indexConfig.index,
                    body: indexConfig.mapping as MappingTypeMapping,
                });
                console.log(`Elasticsearch index mapping updated: ${indexConfig.index}`);
                return;
            }

            await client.indices.create({
                index: indexConfig.index,
                mappings: indexConfig.mapping as MappingTypeMapping,
            });
            console.log(`Elasticsearch index created: ${indexConfig.index}`);
        })
    );
};

export const initializeElasticsearch = async (): Promise<void> => {
    try {
        await client.ping();
        await createIndex();
        console.log('Elasticsearch is ready');
    } catch (error) {
        console.error('Elasticsearch unavailable. Continuing without Elasticsearch.', error);
    }
};
