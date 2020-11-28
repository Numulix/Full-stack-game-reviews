import http from '../http-common';

class ReviewDataService {

    getAll() {
        return http.get('/reviews');
    }

    get(id) {
        return http.get(`/review/${id}`);
    }

    create(data) {
        return http.post('/reviews', data);
    }

    delete(id) {
        return http.delete(`/review/${id}`);
    }

    update(id, data) {
        return http.put(`/review/${id}`, data);
    }

    findByName(name) {
        return http.get(`/reviews/${name}`);
    }
}

export default new ReviewDataService();