import { URLSearchParams, BaseRequestOptions } from '@angular/http';

export const createRequestOption = (req?: any): BaseRequestOptions => {
    const options: BaseRequestOptions = new BaseRequestOptions();
    if (req) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('page', req.page);
        params.set('size', req.size);
        if (req.sort) {
            params.paramsMap.set('sort', req.sort);
        }
        // params.set('query', req.query);
        if (req.criteria && req.criteria.length > 0) {
            req.criteria.forEach((criterion) => {
                params.append(criterion.key, criterion.value);
            });
        }

        options.params = params;
    }
    return options;
};
