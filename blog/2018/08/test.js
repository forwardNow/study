function echartSort(cityList, valueList) {
  // var cityList = [ '武汉2', '南京4', '天津3', '北京5' ];

  // var valueList = [ 22, 44, 33, 55 ];

  const mapping = [];
  const newCityList = [];
  const newValueList = [];

  cityList.forEach((item, index) => {
    mapping.push({
      city: item,
      value: valueList[index],
    });
  });

  mapping.sort((item1, item2) => item1.value < item2.value);

  mapping.forEach((item) => {
    newCityList.push(item.city);
    newValueList.push(item.value);
  });

  return {
    cityList: newCityList,
    valueList: newValueList,
  };
}

const cityList = ['武汉2', '南京4', '天津3', '北京5'];
const valueList = [22, 44, 33, 55];

const sortResult = echartSort(cityList, valueList);

console.log(sortResult);
