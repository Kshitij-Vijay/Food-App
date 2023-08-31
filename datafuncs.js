export function get_all_data(dbname){
    let s = "select * from " + dbname + " ;";    
    return s;
}