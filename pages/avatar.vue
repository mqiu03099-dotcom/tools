<template>
  <div class="page">
    <div class="hero">
      <div>
        <p class="eyebrow">Avatar Admin</p>
        <h1>头像管理工作台</h1>
        <p class="subtitle">
          支持本地上传和外链下载到 <code>public/</code>，并直接编辑整份
          <code>avatar.json</code>。
        </p>
      </div>
      <div class="hero-actions">
        <button
          class="primary-btn"
          type="button"
          :disabled="jsonLoading || jsonSaving"
          @click="saveJson"
        >
          {{ jsonSaving ? "保存中..." : "保存 JSON" }}
        </button>
      </div>
    </div>

    <div class="stack-layout">
      <section class="panel">
        <div class="panel-header">
          <h2>导入图片</h2>
          <span>文件名自动按时间戳生成</span>
        </div>

        <div class="import-grid">
          <label class="upload-card">
            <span>本地上传</span>
            <strong>{{ localFileName || "选择一张图片" }}</strong>
            <small>支持常见图片类型，上传后自动写入 public 目录</small>
            <input
              accept="image/*"
              type="file"
              @change="handleFileChange"
            />
          </label>

          <div class="input-card">
            <label for="remote-url">外部图片链接</label>
            <textarea
              id="remote-url"
              v-model.trim="remoteInput"
              placeholder="https://example.com/avatar.jpg"
              rows="5"
            />
            <button
              class="secondary-btn full-width"
              type="button"
              :disabled="remoteLoading"
              @click="importRemoteImage"
            >
              {{ remoteLoading ? "下载中..." : "下载并保存到 public" }}
            </button>
          </div>
        </div>
      </section>

      <section class="panel output-panel">
        <div class="panel-header">
          <h2>结果输出</h2>
          <span>{{ imageMeta.fileName || "等待导入图片" }}</span>
        </div>

        <div class="result-list">
          <div class="result-item">
            <span>文件名</span>
            <strong>{{ imageMeta.fileName || "-" }}</strong>
          </div>
          <div class="result-item">
            <span>远程 URL</span>
            <code>{{ imageMeta.url || "-" }}</code>
          </div>
        </div>

        <div class="output-actions">
          <button
            class="secondary-btn"
            type="button"
            :disabled="copyDisabled"
            @click="copyUrl"
          >
            复制远程 URL
          </button>
        </div>

        <p
          v-if="status.message"
          class="status"
          :class="status.type"
        >
          {{ status.message }}
        </p>
      </section>

      <section class="panel editor-panel">
        <div class="panel-header">
          <h2>avatar.json</h2>
          <span>{{ jsonLoading ? "读取中..." : "整份内容手动维护" }}</span>
        </div>

        <textarea
          ref="jsonEditorRef"
          v-model="jsonText"
          class="json-editor"
          spellcheck="false"
          @input="syncJsonEditorHeight"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: "头像管理",
});

type ImageMeta = {
  fileName: string;
  url: string;
};

type StatusState = {
  message: string;
  type: "idle" | "success" | "error";
};

const jsonText = ref("");
const jsonEditorRef = ref<HTMLTextAreaElement | null>(null);
const jsonLoading = ref(false);
const jsonSaving = ref(false);
const remoteLoading = ref(false);
const localFileName = ref("");
const imageMeta = reactive<ImageMeta>({
  fileName: "",
  url: "",
});
const status = reactive<StatusState>({
  message: "",
  type: "idle",
});
const copyDisabled = computed(() => !imageMeta.url);
const remoteInput = ref("");

function setStatus(message: string, type: StatusState["type"]) {
  status.message = message;
  status.type = type;
}

function syncJsonEditorHeight() {
  const element = jsonEditorRef.value;

  if (!element) {
    return;
  }

  element.style.height = "auto";
  element.style.height = `${Math.max(element.scrollHeight, 420)}px`;
}

async function loadJson() {
  jsonLoading.value = true;

  try {
    const response = await $fetch<{ content: string }>("/api/avatar-admin/json");
    jsonText.value = response.content;
    await nextTick();
    syncJsonEditorHeight();
    setStatus("已加载 avatar.json", "success");
  } catch (error: any) {
    setStatus(error?.data?.statusMessage || error?.message || "读取 avatar.json 失败", "error");
  } finally {
    jsonLoading.value = false;
  }
}

function applyImageMeta(payload: ImageMeta) {
  imageMeta.fileName = payload.fileName;
  imageMeta.url = payload.url;
}

async function uploadLocalFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await $fetch<ImageMeta>("/api/avatar-admin/upload", {
    method: "POST",
    body: formData,
  });

  applyImageMeta(response);
  setStatus("本地图片已保存到 public 目录", "success");
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    setStatus("请选择图片文件", "error");
    input.value = "";
    return;
  }

  localFileName.value = file.name;

  try {
    await uploadLocalFile(file);
  } catch (error: any) {
    setStatus(error?.data?.statusMessage || error?.message || "图片上传失败", "error");
  } finally {
    input.value = "";
  }
}

async function importRemoteImage() {
  if (!remoteInput.value) {
    setStatus("请先输入图片链接", "error");
    return;
  }

  remoteLoading.value = true;

  try {
    const response = await $fetch<ImageMeta>("/api/avatar-admin/import", {
      method: "POST",
      body: {
        url: remoteInput.value,
      },
    });

    applyImageMeta(response);
    setStatus("外链图片已下载并保存到 public 目录", "success");
  } catch (error: any) {
    setStatus(error?.data?.statusMessage || error?.message || "远程图片导入失败", "error");
  } finally {
    remoteLoading.value = false;
  }
}

async function saveJson() {
  if (!jsonText.value.trim()) {
    setStatus("JSON 内容不能为空", "error");
    return;
  }

  jsonSaving.value = true;

  try {
    await $fetch("/api/avatar-admin/json", {
      method: "POST",
      body: {
        content: jsonText.value,
      },
    });
    setStatus("avatar.json 已更新", "success");
    window.alert("avatar.json 保存成功");
  } catch (error: any) {
    setStatus(error?.data?.statusMessage || error?.message || "保存失败", "error");
  } finally {
    jsonSaving.value = false;
  }
}

async function copyUrl() {
  if (!imageMeta.url) {
    return;
  }

  try {
    await navigator.clipboard.writeText(imageMeta.url);
    setStatus("远程 URL 已复制", "success");
  } catch {
    setStatus("复制失败，请手动复制", "error");
  }
}

onMounted(() => {
  loadJson();
});

watch(jsonText, async () => {
  await nextTick();
  syncJsonEditorHeight();
});
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 32px;
  background:
    radial-gradient(circle at top left, rgba(123, 92, 255, 0.15), transparent 28%),
    radial-gradient(circle at top right, rgba(0, 191, 165, 0.14), transparent 26%),
    linear-gradient(180deg, #f8fbff 0%, #eef2f8 100%);
  color: #122033;
}

.hero {
  display: flex;
  gap: 24px;
  min-width: 0;
  align-items: flex-end;
  justify-content: space-between;
  margin: 0 auto 24px;
  max-width: 1600px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #4f46e5;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(32px, 4vw, 46px);
  line-height: 1.05;
}

.subtitle {
  max-width: 720px;
  margin: 12px 0 0;
  color: #475467;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 12px;
  min-width: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.stack-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
  max-width: 1120px;
  margin: 0 auto;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
  padding: 22px;
  border: 1px solid rgba(18, 32, 51, 0.08);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 20px 45px rgba(21, 34, 50, 0.08);
  backdrop-filter: blur(18px);
}

.panel-header {
  display: flex;
  gap: 12px;
  min-width: 0;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
}

.panel-header h2 {
  margin: 0;
  font-size: 22px;
}

.panel-header span {
  min-width: 0;
  color: #667085;
  font-size: 13px;
  word-break: break-all;
}

.import-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
  gap: 16px;
}

.upload-card,
.input-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  padding: 18px;
  border: 1px solid #d7def0;
  border-radius: 18px;
  background: #f8faff;
}

.upload-card {
  cursor: pointer;
  border-style: dashed;
}

.upload-card span,
.input-card label {
  color: #43526a;
  font-size: 14px;
  font-weight: 700;
}

.upload-card strong {
  font-size: 18px;
}

.upload-card small {
  color: #667085;
  line-height: 1.6;
}

.upload-card input {
  display: none;
}

textarea {
  width: 100%;
  max-width: 100%;
  border: 1px solid #ced8ea;
  border-radius: 16px;
  padding: 14px 16px;
  outline: none;
  resize: vertical;
  font: inherit;
  background: #fff;
  color: #122033;
}

textarea:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
}

.result-list {
  display: grid;
  gap: 12px;
}

.result-item {
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f8faff;
}

.result-item span {
  color: #667085;
  font-size: 13px;
}

.result-item strong,
.result-item code {
  word-break: break-all;
}

.editor-panel {
  min-height: 0;
}

.output-panel {
  gap: 16px;
}

.json-editor {
  min-height: 420px;
  border-radius: 20px;
  background: #0d1526;
  color: #d5e4ff;
  font-family: "Cascadia Code", "SFMono-Regular", Consolas, monospace;
  line-height: 1.6;
  overflow: hidden;
}

.output-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.primary-btn,
.secondary-btn {
  border: 0;
  border-radius: 999px;
  padding: 12px 18px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    opacity 0.18s ease,
    box-shadow 0.18s ease;
}

.primary-btn {
  color: #fff;
  background: linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%);
  box-shadow: 0 14px 30px rgba(79, 70, 229, 0.28);
}

.secondary-btn {
  color: #213147;
  background: #e9eefb;
}

.full-width {
  width: 100%;
}

.primary-btn:hover,
.secondary-btn:hover {
  transform: translateY(-1px);
}

.primary-btn:disabled,
.secondary-btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
  transform: none;
  box-shadow: none;
}

.status {
  margin: 0;
  border-radius: 14px;
  padding: 12px 14px;
  font-weight: 600;
}

.status.success {
  color: #166534;
  background: #dcfce7;
}

.status.error {
  color: #991b1b;
  background: #fee2e2;
}

@media (max-width: 1180px) {
  .import-grid {
    grid-template-columns: 1fr;
  }

  .editor-panel {
    min-height: 0;
  }

  .json-editor {
    min-height: 420px;
  }
}

@media (max-width: 720px) {
  .page {
    padding: 18px;
  }

  .hero {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-actions {
    justify-content: stretch;
  }

  .hero-actions button {
    flex: 1;
  }

  .output-actions button {
    width: 100%;
  }
}
</style>
