/**
 * 冒泡排序是稳定排序，因为相等的元素不会发生交换
 */

function bubbleSort(nums) {
    for(var i=0; i<nums.length-1; i++) {
        for(var j=0; j<nums.length-1-i; j++) {
            if(nums[j] < nums[j+1]) {
                var temp = nums[j];
                nums[j] = nums[j+1];
                nums[j+1] = temp;
            }
        }
    }
    return nums;
}