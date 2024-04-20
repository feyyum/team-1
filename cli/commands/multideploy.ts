import { getDatabase, ref, get, set, update } from 'firebase/database';
import path from 'path';




const multideploy = async () => {
    // deploy işleri
    const db = getDatabase();
    const reference = ref(db, "/deployments");
    update(reference, {
        status: "Deployed"
    })
}