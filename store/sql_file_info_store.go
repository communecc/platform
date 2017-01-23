// See License.txt for license information.

package store

import (
	"github.com/commune/platform/model"
)

type SqlFileInfoStore struct {
	*SqlStore
}

func NewSqlFileInfoStore(sqlStore *SqlStore) FileInfoStore {
	s := &SqlFileInfoStore{sqlStore}

	for _, db := range sqlStore.GetAllConns() {
		table := db.AddTableWithName(model.FileInfo{}, "FileInfo").SetKeys(false, "Id")
		table.ColMap("Id").SetMaxSize(26)
		table.ColMap("CreatorId").SetMaxSize(26)
		table.ColMap("PostId").SetMaxSize(26)
		table.ColMap("Path").SetMaxSize(512)
		table.ColMap("ThumbnailPath").SetMaxSize(512)
		table.ColMap("PreviewPath").SetMaxSize(512)
		table.ColMap("Name").SetMaxSize(256)
		table.ColMap("Extension").SetMaxSize(64)
		table.ColMap("MimeType").SetMaxSize(256)
	}

	return s
}

func (fs SqlFileInfoStore) CreateIndexesIfNotExists() {
}

func (fs SqlFileInfoStore) Save(info *model.FileInfo) StoreChannel {
	storeChannel := make(StoreChannel, 1)

	go func() {
		result := StoreResult{}

		info.PreSave()
		if result.Err = info.IsValid(); result.Err != nil {
			storeChannel <- result
			close(storeChannel)
			return
		}

		if err := fs.GetMaster().Insert(info); err != nil {
			result.Err = model.NewLocAppError("SqlFileInfoStore.Save", "store.sql_file_info.save.app_error", nil, err.Error())
		} else {
			result.Data = info
		}

		storeChannel <- result
		close(storeChannel)
	}()

	return storeChannel
}

func (fs SqlFileInfoStore) Get(id string) StoreChannel {
	storeChannel := make(StoreChannel, 1)

	go func() {
		result := StoreResult{}

		info := &model.FileInfo{}

		if err := fs.GetReplica().SelectOne(info,
			`SELECT
				*
			FROM
				FileInfo
			WHERE
				Id = :Id
				AND DeleteAt = 0`, map[string]interface{}{"Id": id}); err != nil {
			result.Err = model.NewLocAppError("SqlFileInfoStore.Get", "store.sql_file_info.get.app_error", nil, "id="+id+", "+err.Error())
		} else {
			result.Data = info
		}

		storeChannel <- result
		close(storeChannel)
	}()

	return storeChannel
}

func (fs SqlFileInfoStore) GetByPath(path string) StoreChannel {
	storeChannel := make(StoreChannel, 1)

	go func() {
		result := StoreResult{}

		info := &model.FileInfo{}

		if err := fs.GetReplica().SelectOne(info,
			`SELECT
				*
			FROM
				FileInfo
			WHERE
				Path = :Path
				AND DeleteAt = 0
			LIMIT 1`, map[string]interface{}{"Path": path}); err != nil {
			result.Err = model.NewLocAppError("SqlFileInfoStore.GetByPath", "store.sql_file_info.get_by_path.app_error", nil, "path="+path+", "+err.Error())
		} else {
			result.Data = info
		}

		storeChannel <- result
		close(storeChannel)
	}()

	return storeChannel
}

func (fs SqlFileInfoStore) GetForPost(postId string) StoreChannel {
	storeChannel := make(StoreChannel, 1)

	go func() {
		result := StoreResult{}

		var infos []*model.FileInfo

		if _, err := fs.GetReplica().Select(&infos,
			`SELECT
				*
			FROM
				FileInfo
			WHERE
				PostId = :PostId
				AND DeleteAt = 0
			ORDER BY
				CreateAt`, map[string]interface{}{"PostId": postId}); err != nil {
			result.Err = model.NewLocAppError("SqlFileInfoStore.GetForPost",
				"store.sql_file_info.get_for_post.app_error", nil, "post_id="+postId+", "+err.Error())
		} else {
			result.Data = infos
		}

		storeChannel <- result
		close(storeChannel)
	}()

	return storeChannel
}

func (fs SqlFileInfoStore) AttachToPost(fileId, postId string) StoreChannel {
	storeChannel := make(StoreChannel, 1)

	go func() {
		result := StoreResult{}

		if _, err := fs.GetMaster().Exec(
			`UPDATE
					FileInfo
				SET
					PostId = :PostId
				WHERE
					Id = :Id
					AND PostId = ''`, map[string]interface{}{"PostId": postId, "Id": fileId}); err != nil {
			result.Err = model.NewLocAppError("SqlFileInfoStore.AttachToPost",
				"store.sql_file_info.attach_to_post.app_error", nil, "post_id="+postId+", file_id="+fileId+", err="+err.Error())
		}

		storeChannel <- result
		close(storeChannel)
	}()

	return storeChannel
}

func (fs SqlFileInfoStore) DeleteForPost(postId string) StoreChannel {
	storeChannel := make(StoreChannel, 1)

	go func() {
		result := StoreResult{}

		if _, err := fs.GetMaster().Exec(
			`UPDATE
				FileInfo
			SET
				DeleteAt = :DeleteAt
			WHERE
				PostId = :PostId`, map[string]interface{}{"DeleteAt": model.GetMillis(), "PostId": postId}); err != nil {
			result.Err = model.NewLocAppError("SqlFileInfoStore.DeleteForPost",
				"store.sql_file_info.delete_for_post.app_error", nil, "post_id="+postId+", err="+err.Error())
		} else {
			result.Data = postId
		}

		storeChannel <- result
		close(storeChannel)
	}()

	return storeChannel
}
