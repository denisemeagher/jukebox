require 'test_helper'

class AlbumControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get album_index_url
    assert_response :success
  end

end
