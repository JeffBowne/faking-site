module HamlInterpreter
  class Generator < Jekyll::Generator
    def generate(site)
      partials_source = site.config['haml_partials_dir']
      partials_destination = site.config['generated_html_dir']
      layout_haml = layout_source_path(site)
      layout_html = 'index.html'
      partial_updated = false

      Dir.glob(File.join(partials_source, '*.haml')).each do |partial_haml|
        partial_html = partial_haml.sub(partials_source, partials_destination).sub(/\.haml$/i, '.html')

        if changes_made?(partial_haml, partial_html)
          convert_haml(partial_haml, partial_html)
          partial_updated = true
        end
      end

      if partial_updated || changes_made?(layout_haml, layout_html)
        convert_haml(layout_haml, layout_html)
      end
    end

    def layout_source_path(site)
      File.join(site.config['haml_dir'], 'index.haml')
    end

    def convert_haml(haml_file, html_file)
      log `haml #{haml_file} #{html_file}`
      log "#{haml_file} ---->> #{html_file}"
    end

    def changes_made?(haml_file, html_file)
      !File.exists?(html_file) || File.exists?(html_file) && (File.mtime(html_file) < File.mtime(haml_file))
    end

    def log(msg)
      print "\nHamlInterpreter: #{msg}" unless msg.empty?
    end
  end
end