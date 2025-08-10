export function searchObat(obatList, searchterm){
    return obatList.filter(obat =>
        obat.nama_obat.toLowerCase().startsWith(searchterm.toLowerCase())
    );
}