// tüm süreci database kaydetip status: done olacak

import { getDatabase, ref, get, set, update } from 'firebase/database';
import path from 'path';

export const save = async () => {
    //deploy edilecek ve adresler alınacak
    //her ağdaki deploy kontrol edilmeli, hepsine ayrı obje oluşturulacak
    const db = getDatabase();
    const reference = ref(db, "/deployments");
    update(reference, {
        status: "Done"
        // seçilen ağlardaki deploy adresleri
    })
}