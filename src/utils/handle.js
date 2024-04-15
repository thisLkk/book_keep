export function formatDate(timestamp, format) {  
    const date = new Date(timestamp);  
    const year = date.getFullYear();  
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero based  
    const day = ('0' + date.getDate()).slice(-2);  
    const hours = ('0' + date.getHours()).slice(-2);  
    const minutes = ('0' + date.getMinutes()).slice(-2);  
    const seconds = ('0' + date.getSeconds()).slice(-2);  
  
    // 根据提供的格式字符串替换相应的值  
    const formattedDate = format  
        .replace('yyyy', year)  
        .replace('MM', month)  
        .replace('dd', day)  
        .replace('HH', hours)  
        .replace('mm', minutes)  
        .replace('ss', seconds);  
  
    return formattedDate;  
}
export function getDayOfWeek(timestamp) {  
    const date = new Date(timestamp); // 创建一个Date对象，默认为当前日期和时间  
    const dayOfWeek = date.getDay(); // getDay()方法返回一周中的第几天（0代表周日，1代表周一，以此类推，6代表周六）  
  
    // 创建一个数组来存储星期的名称  
    const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];  
  
    // 使用getDay()的返回值作为索引来获取对应的星期名称  
    const dayName = daysOfWeek[dayOfWeek];  
  
    return dayName;  
} 