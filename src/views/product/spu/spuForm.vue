<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option>h</el-option>
        <el-option>a</el-option>
        <el-option>v</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select>
        <el-option>h</el-option>
        <el-option>a</el-option>
        <el-option>v</el-option>
      </el-select>
      <el-button style="margin-left: 10px" lable="SPU销售属性" type="primary" icon="Plus">
        添加属性值
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-table border>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="销售属性名字" width="120px"></el-table-column>
        <el-table-column label="销售属性值"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
const $emit = defineEmits(['changeScene'])

const cancel = () => {
  $emit('changeScene', 0)
}

</script>

<style scoped></style>
