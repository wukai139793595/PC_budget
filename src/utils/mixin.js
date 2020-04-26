//合并行通用方法
export function mergeTableRow(data, merge) {
  if (!merge || merge.length === 0) {
    return data
  }
  merge.forEach((m) => {
    const mList = {}
    data = data.map((v, index) => {
      const rowVal = v[m]
      if (mList[rowVal]) {
        mList[rowVal]++
        data[index - (mList[rowVal] - 1)][m + '-span'].rowspan++
        v[m + '-span'] = {
          rowspan: 0,
          colspan: 0
        }
      } else {
        mList[rowVal] = 1
        v[m + '-span'] = {
          rowspan: 1,
          colspan: 1
        }
      }
      return v
    })
  })
  return data
}


export function createSpan(tableData, arr) {
  let spanArr = new Array(arr.length);
  for (let m = 0; m < spanArr.length; m++) {
    spanArr[m] = new Array(tableData.length);
  }
  for (let j = 0; j < 2; j++) {
    let name = arr[j]
    let num = 0;
    let nowIndex = -1;
    for (let i = 0; i < tableData.length; i++) {
      if (i < tableData.length - 1) {
        if (tableData[i][name] == tableData[i + 1][name]) {
          num += 1;
          if (nowIndex == -1) {
            nowIndex = i;
          } else {
            spanArr[j][i] = {
              colspan: 0,
              rowspan: 0
            };
          }
        } else if (tableData[i][name] !== tableData[i + 1][name]) {
          if (num != 0) {
            num += 1;
            spanArr[j][nowIndex] = {
              colspan: 1,
              rowspan: num
            };
            spanArr[j][i] = {
              colspan: 0,
              rowspan: 0
            };
            num = 0;
            nowIndex = -1;
          } else {
            spanArr[j][i] = {
              colspan: 1,
              rowspan: 1
            }
          }
        }
      } if (i == tableData.length - 1) {
        if (num != 0) {
          num += 1;
          spanArr[j][nowIndex] = {
            colspan: 1,
            rowspan: num
          };
          spanArr[j][i] = {
            colspan: 0,
            rowspan: 0
          };
          num = 0;
          nowIndex = -1;
        }else {
          spanArr[j][i] = {
            colspan: 1,
            rowspan: 1
          }
        }
      }
    }
  }
  for (let i = 0; i < tableData.length; i++) {
    let name1 = arr[0];
    let name2 = arr[1];
    if (tableData[i][name1] === tableData[i][name2]) {
      spanArr[0][i] = {
        colspan: 2,
        rowspan: 1
      };
      spanArr[1][i] = {
        colspan: 0,
        rowspan: 0
      };
    }
  }
  return spanArr
}


export function createSpanOne(tableData, str) {
  let spanArr = new Array(tableData.length);
  let name = str;
  let num = 0;
  let nowIndex = -1;
  for (let i = 0; i < tableData.length; i++) {
    if (i < tableData.length - 1) {
      if (tableData[i][name] == tableData[i + 1][name]) {
        num += 1;
        if (nowIndex == -1) {
          nowIndex = i;
        } else {
          spanArr[i] = {
            colspan: 0,
            rowspan: 0
          };
        }
      } else if (tableData[i][name] !== tableData[i + 1][name]) {
        if (num != 0) {
          num += 1;
          spanArr[nowIndex] = {
            colspan: 1,
            rowspan: num
          };
          spanArr[i] = {
            colspan: 0,
            rowspan: 0
          };
          num = 0;
          nowIndex = -1;
        } else {
          spanArr[i] = {
            colspan: 1,
            rowspan: 1
          }
        }
      }
    } if (i == tableData.length - 1) {
      if (num != 0) {
        num += 1;
        spanArr[nowIndex] = {
          colspan: 1,
          rowspan: num
        };
        spanArr[i] = {
          colspan: 0,
          rowspan: 0
        };
        num = 0;
        nowIndex = -1;
      }else {
        spanArr[i] = {
          colspan: 1,
          rowspan: 1
        }
      }
    }
  }


  return spanArr
}

export function createSpanTrend(tableData, arr, str) {
  let spanArr = new Array(arr.length);
  for (let m = 0; m < spanArr.length; m++) {
    spanArr[m] = new Array(tableData.length);
  }
  for (let j = 0; j < 3; j++) {
    let name = arr[j]
    let num = 0;
    let nowIndex = -1;
    for (let i = 0; i < tableData.length; i++) {
      if (i < tableData.length - 1) {
        if (tableData[i][name] == tableData[i + 1][name]) {
          num += 1;
          if (nowIndex == -1) {
            nowIndex = i;
          } else {
            spanArr[j][i] = {
              colspan: 0,
              rowspan: 0
            };
          }
        } else if (tableData[i][name] !== tableData[i + 1][name]) {
          if (num != 0) {
            num += 1;
            spanArr[j][nowIndex] = {
              colspan: 1,
              rowspan: num
            };
            spanArr[j][i] = {
              colspan: 0,
              rowspan: 0
            };
            num = 0;
            nowIndex = -1;
          } else {
            spanArr[j][i] = {
              colspan: 1,
              rowspan: 1
            }
          }
        }
      } if (i == tableData.length - 1) {
        if (num != 0) {
          num += 1;
          spanArr[j][nowIndex] = {
            colspan: 1,
            rowspan: num
          };
          spanArr[j][i] = {
            colspan: 0,
            rowspan: 0
          };
          num = 0;
          nowIndex = -1;
        }else {
          spanArr[j][i] = {
            colspan: 1,
            rowspan: 1
          }
        }
      }
    }
  }
  for (let i = 0; i < tableData.length; i++) {
    let name1 = arr[1];
    // let name2 = arr[1];
    if (tableData[i][name1] === null) {
      spanArr[1][i] = {
        colspan: 0,
        rowspan: 0
      };
      spanArr[2][i] = {
        colspan: 2,
        rowspan: 1
      };
    }
  }
  return spanArr
}


export function createSpanCharge(tableData, arr) {
  let spanArr = new Array(arr.length);
  for (let m = 0; m < spanArr.length; m++) {
    spanArr[m] = new Array(tableData.length);
  }
  for (let j = 0; j < 3; j++) {
    let name = arr[j]
    let num = 0;
    let nowIndex = -1;
    for (let i = 0; i < tableData.length; i++) {
      if (i < tableData.length - 1) {
        if (tableData[i][name] == tableData[i + 1][name]) {
          num += 1;
          if (nowIndex == -1) {
            nowIndex = i;
          } else {
            spanArr[j][i] = {
              colspan: 0,
              rowspan: 0
            };
          }
        } else if (tableData[i][name] !== tableData[i + 1][name]) {
          if (num != 0) {
            num += 1;
            spanArr[j][nowIndex] = {
              colspan: 1,
              rowspan: num
            };
            spanArr[j][i] = {
              colspan: 0,
              rowspan: 0
            };
            num = 0;
            nowIndex = -1;
          } else {
            spanArr[j][i] = {
              colspan: 1,
              rowspan: 1
            }
          }
        }
      } if (i == tableData.length - 1) {
        if (num != 0) {
          num += 1;
          spanArr[j][nowIndex] = {
            colspan: 1,
            rowspan: num
          };
          spanArr[j][i] = {
            colspan: 0,
            rowspan: 0
          };
          num = 0;
          nowIndex = -1;
        }else {
          spanArr[j][i] = {
            colspan: 1,
            rowspan: 1
          }
        }
      }
    }
  }
  // for (let i = 0; i < tableData.length; i++) {
  //   let name1 = arr[1];
  //   // let name2 = arr[1];
  //   if (tableData[i][name1] === "小计") {
  //     spanArr[1][i] = {
  //       colspan: 0,
  //       rowspan: 0
  //     };
  //     spanArr[2][i] = {
  //       colspan: 0,
  //       rowspan: 0
  //     };
  //     spanArr[3][i] = {
  //       colspan: 3,
  //       rowspan: 1
  //     };
  //   }
  // }
  return spanArr
}

export function mergeSpan (tableData, arr) { //["areName","indexCode","]
  let spanArr = new Array(tableData.length);
  for (let m = 0; m < spanArr.length; m++) {
    spanArr[m] = new Array(arr.length);
  }
  arr.forEach((ele,ind) => {
    let pos = null;
    tableData.forEach((item,index,self) => {

      if (index == 0) {
        spanArr[index][ind]={
          rowspan: 1,
          colspan: 1
        }
        pos = 0;
      } else {
        if (item[ele] === self[index-1][ele]) {
          spanArr[pos][ind].rowspan += 1;
          spanArr[index][ind]={
            rowspan: 0,
            colspan: 0
          }
        } else {
          pos = index;
          spanArr[index][ind] = {
            rowspan: 1,
            colspan: 1
          }
        }
      }
    })
  })

  tableData.forEach((item,index) => {
    let pos = null;
    arr.forEach((ele,ind,self) => {
      if (ind == 0 && spanArr[index][ind].rowspan == 1) {
        spanArr[index][ind].colspan = 1;
        pos = 0;
      } else {
        if (item[ele] == item[self[ind-1]] && spanArr[index][pos].rowspan == 1) {
          spanArr[index][pos].colspan += 1;
          spanArr[index][ind] = {
            rowspan: 0,
            colspan: 0
          }
        } else {
          pos = ind;
        }
      }
    })
  })
  return spanArr
}
