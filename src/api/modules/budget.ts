import { request } from "@/api/request";

export function getBudgetTotal() {
    return request({
        url: 'v1/admin/countBudgetTotal',
        method: 'GET'
    })
}
